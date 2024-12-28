import { NextResponse } from 'next/server'
import { categories } from '../../../categories'

function findCategoryById(id: number): Category | undefined {
  for (const category of categories) {
    if (category.id === id) return category
    const found = findCategoryInChildren(category.children, id)
    if (found) return found
  }
}

function findCategoryInChildren(children: Category[], id: number): Category | undefined {
  for (const child of children) {
    if (child.id === id) return child
    const found = findCategoryInChildren(child.children, id)
    if (found) return found
  }
}

function removeCategoryById(id: number) {
  const index = categories.findIndex(c => c.id === id)
  if (index !== -1) {
    categories.splice(index, 1)
    return
  }
  for (const category of categories) {
    removeCategoryFromChildren(category.children, id)
  }
}

function removeCategoryFromChildren(children: Category[], id: number) {
  const index = children.findIndex(c => c.id === id)
  if (index !== -1) {
    children.splice(index, 1)
    return
  }
  for (const child of children) {
    removeCategoryFromChildren(child.children, id)
  }
}

export async function GET() {
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const newCategory = await request.json()
  newCategory.id = Math.max(...categories.map(c => c.id)) + 1
  newCategory.children = []
  
  if (newCategory.parentId) {
    const parent = findCategoryById(newCategory.parentId)
    if (parent) {
      parent.children.push(newCategory)
    } else {
      return NextResponse.json({ error: 'Parent category not found' }, { status: 404 })
    }
  } else {
    categories.push(newCategory)
  }
  
  return NextResponse.json(categories)
}

export async function PUT(request: Request) {
  const updatedCategory = await request.json()
  const category = findCategoryById(updatedCategory.id)
  
  if (category) {
    Object.assign(category, updatedCategory)
    if (category.parentId !== updatedCategory.parentId) {
      // Handle moving the category
      removeCategoryById(category.id)
      if (updatedCategory.parentId) {
        const newParent = findCategoryById(updatedCategory.parentId)
        if (newParent) {
          newParent.children.push(category)
        } else {
          return NextResponse.json({ error: 'New parent category not found' }, { status: 404 })
        }
      } else {
        categories.push(categorycategories.push(category)
      }
    }
    return NextResponse.json(categories)
  }
  
  return NextResponse.json({ error: 'Category not found' }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '')
  
  removeCategoryById(id)
  
  return NextResponse.json(categories)
}


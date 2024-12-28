'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

interface SiteSettings {
  siteName: string
  siteSubtitle: string
  siteKeywords: string
  metaDescription: string
  logo: string
  favicon: string
  customAdCode: string
  googleAnalyticsId: string
  baiduAnalyticsId: string
  emailServer: string
  emailPort: string
  emailUser: string
  emailPassword: string
  primaryColor: string
  secondaryColor: string
  facebookUrl: string
  twitterUrl: string
  linkedinUrl: string
  privacyPolicy: string
  termsOfService: string
  enableMultilingual: boolean
  languages: string[]
}

export default function AdminSettings() {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteSubtitle: '',
    siteKeywords: '',
    metaDescription: '',
    logo: '',
    favicon: '',
    customAdCode: '',
    googleAnalyticsId: '',
    baiduAnalyticsId: '',
    emailServer: '',
    emailPort: '',
    emailUser: '',
    emailPassword: '',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    privacyPolicy: '',
    termsOfService: '',
    enableMultilingual: false,
    languages: ['en'],
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      } else {
        toast({
          title: "错误",
          description: "获取设置失败",
          variant: "destructive",
        })
      }
    }
    fetchSettings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', e.target.name) // 'logo' or 'favicon'

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setSettings(prev => ({ ...prev, [e.target.name]: data.url }))
        toast({
          title: "成功",
          description: "文件上传成功",
        })
      } else {
        toast({
          title: "错误",
          description: "文件上传失败",
          variant: "destructive",
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const response = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })

    setIsLoading(false)

    if (response.ok) {
      toast({
        title: "成功",
        description: "设置已保存",
      })
    } else {
      toast({
        title: "错误",
        description: "保存设置失败",
        variant: "destructive",
      })
    }
  }

  const handleClearCache = async () => {
    const response = await fetch('/api/admin/clear-cache', { method: 'POST' })

    if (response.ok) {
      toast({
        title: "成功",
        description: "缓存已清理",
      })
    } else {
      toast({
        title: "错误",
        description: "清理缓存失败",
        variant: "destructive",
      })
    }
  }

  const handleGenerateSitemap = async () => {
    const response = await fetch('/api/admin/generate-sitemap', { method: 'POST' })

    if (response.ok) {
      toast({
        title: "成功",
        description: "网站地图已生成并提交",
      })
    } else {
      toast({
        title: "错误",
        description: "生成网站地图失败",
        variant: "destructive",
      })
    }
  }

  const handleBackup = async () => {
    const response = await fetch('/api/admin/backup', { method: 'POST' })

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'site_backup.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      toast({
        title: "成功",
        description: "网站备份已下载",
      })
    } else {
      toast({
        title: "错误",
        description: "创建备份失败",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">常规设置</TabsTrigger>
          <TabsTrigger value="seo">SEO 设置</TabsTrigger>
          <TabsTrigger value="appearance">外观设置</TabsTrigger>
          <TabsTrigger value="advanced">高级设置</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>常规设置</CardTitle>
              <CardDescription>管理网站的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">网站名称</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteSubtitle">网站副标题</Label>
                <Input
                  id="siteSubtitle"
                  name="siteSubtitle"
                  value={settings.siteSubtitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">上传 Logo</Label>
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {settings.logo && <img src={settings.logo} alt="Logo" className="mt-2 h-12" />}
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon">上传 Favicon</Label>
                <Input
                  id="favicon"
                  name="favicon"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/x-icon,image/png"
                />
                {settings.favicon && <img src={settings.favicon} alt="Favicon" className="mt-2 h-6" />}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO 设置</CardTitle>
              <CardDescription>优化网站的搜索引擎表现</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteKeywords">关键词（用逗号分隔）</Label>
                <Input
                  id="siteKeywords"
                  name="siteKeywords"
                  value={settings.siteKeywords}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta 描述</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={settings.metaDescription}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  name="googleAnalyticsId"
                  value={settings.googleAnalyticsId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baiduAnalyticsId">百度统计 ID</Label>
                <Input
                  id="baiduAnalyticsId"
                  name="baiduAnalyticsId"
                  value={settings.baiduAnalyticsId}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="button" onClick={handleGenerateSitemap}>
                生成网站地图并提交
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>外观设置</CardTitle>
              <CardDescription>自定义网站的视觉风格</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">主色调</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="primaryColor"
                    name="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={handleInputChange}
                    className="w-12 h-12 p-1"
                  />
                  <Input
                    type="text"
                    value={settings.primaryColor}
                    onChange={handleInputChange}
                    name="primaryColor"
                    className="flex-grow"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">次要色调</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="secondaryColor"
                    name="secondaryColor"
                    type="color"
                    value={settings.secondaryColor}
                    onChange={handleInputChange}
                    className="w-12 h-12 p-1"
                  />
                  <Input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={handleInputChange}
                    name="secondaryColor"
                    className="flex-grow"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customAdCode">自定义广告代码</Label>
                <Textarea
                  id="customAdCode"
                  name="customAdCode"
                  value={settings.customAdCode}
                  onChange={handleInputChange}
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>高级设置</CardTitle>
              <CardDescription>配置高级功能和集成</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailServer">邮件服务器</Label>
                <Input
                  id="emailServer"
                  name="emailServer"
                  value={settings.emailServer}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPort">邮件端口</Label>
                <Input
                  id="emailPort"
                  name="emailPort"
                  value={settings.emailPort}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailUser">邮件用户名</Label>
                <Input
                  id="emailUser"
                  name="emailUser"
                  value={settings.emailUser}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPassword">邮件密码</Label>
                <Input
                  id="emailPassword"
                  name="emailPassword"
                  type="password"
                  value={settings.emailPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  name="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter URL</Label>
                <Input
                  id="twitterUrl"
                  name="twitterUrl"
                  value={settings.twitterUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={settings.linkedinUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableMultilingual"
                  checked={settings.enableMultilingual}
                  onCheckedChange={handleSwitchChange('enableMultilingual')}
                />
                <Label htmlFor="enableMultilingual">启用多语言支持</Label>
              </div>
              {settings.enableMultilingual && (
                <div className="space-y-2">
                  <Label htmlFor="languages">支持的语言（用逗号分隔）</Label>
                  <Input
                    id="languages"
                    name="languages"
                    value={settings.languages.join(', ')}
                    onChange={(e) => setSettings(prev => ({ ...prev, languages: e.target.value.split(',').map(lang => lang.trim()) }))}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="privacyPolicy">隐私政策</Label>
                <Textarea
                  id="privacyPolicy"
                  name="privacyPolicy"
                  value={settings.privacyPolicy}
                  onChange={handleInputChange}
                  rows={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="termsOfService">服务条款</Label>
                <Textarea
                  id="termsOfService"
                  name="termsOfService"
                  value={settings.termsOfService}
                  onChange={handleInputChange}
                  rows={10}
                />
              </div>
              <Button type="button" onClick={handleClearCache}>
                清理全站缓存
              </Button>
              <Button type="button" onClick={handleBackup}>
                创建网站备份
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '保存中...' : '保存所有设置'}
        </Button>
      </div>
    </form>
  )
}


import { Plus, SquarePen, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Modal from '../../components/ui/Modal'
import ImageUploadField from '../../components/ui/ImageUploadField'
import mediaService from '../../services/mediaService'
import menuService from '../../services/menuService'
import { formatCurrency } from '../../utils/formatCurrency'
import { inferMenuCategory, menuCategoryLabels, menuItemCategories } from '../../utils/constants'

const defaultForm = {
  foodName: '',
  description: '',
  price: '',
  imageUrl: '',
  category: 'Mains',
  isAvailable: true,
}

const ManageMenu = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(defaultForm)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const loadItems = async () => {
    try {
      setLoading(true)
      const data = await menuService.getAdminAll()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleOpen = (item = null) => {
    setEditingId(item?.id ?? null)
    setForm(
      item
        ? {
            foodName: item.foodName,
            description: item.description,
            price: item.price,
            imageUrl: item.imageUrl,
            category: item.category || inferMenuCategory(item),
            isAvailable: item.isAvailable,
          }
        : defaultForm,
    )
    setOpen(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.imageUrl?.trim()) {
      toast.error('Fadlan soo rar sawir kombiyuutarkaaga (Cloudinary)')
      return
    }

    try {
      setSubmitting(true)
      const payload = {
        ...form,
        price: Number(form.price),
      }

      if (editingId) {
        await menuService.update(editingId, payload)
        toast.success('Cuntada menu-ga waa la cusboonaysiiyay')
      } else {
        await menuService.create(payload)
        toast.success('Cunto cusub ayaa lagu daray menu-ga')
      }

      setOpen(false)
      setForm(defaultForm)
      await loadItems()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      let imageUrl

      try {
        const result = await mediaService.uploadImage(file)
        imageUrl = result.imageUrl
      } catch (backendError) {
        try {
          const result = await mediaService.uploadImageDirect(file)
          imageUrl = result.imageUrl
        } catch {
          throw backendError
        }
      }

      setForm((current) => ({ ...current, imageUrl }))
      toast.success('Sawirka waa la soo raray')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setUploadingImage(false)
      event.target.value = ''
    }
  }

  const handleDelete = async (id) => {
    try {
      await menuService.remove(id)
      toast.success('Cuntada menu-ga waa la saaray')
      await loadItems()
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa menu-ga" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-gold sm:text-sm sm:tracking-[0.35em]">
            Menu-ga Maamulka
          </p>
          <h1 className="section-title mt-2 break-words text-2xl sm:text-3xl lg:text-4xl">
            Maamul cuntooyinka menu-ga
          </h1>
        </div>
        <Button onClick={() => handleOpen()} className="w-full shrink-0 sm:w-auto">
          <Plus size={16} />
          Ku Dar Cunto Cusub
        </Button>
      </div>

      {!items.length && (
        <Card className="p-8 text-center text-brand-cream/70">Weli cunto menu-ga lama helin.</Card>
      )}

      {!!items.length && (
        <>
          <div className="grid gap-4 lg:hidden">
            {items.map((item) => (
              <Card key={item.id} className="p-5">
                <div className="flex gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.foodName}
                    className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{item.foodName}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-brand-cream/60">{item.description}</p>
                    <p className="mt-2 text-brand-gold">{formatCurrency(item.price)}</p>
                    <p className="mt-1 text-xs text-brand-cream/65">
                      {menuCategoryLabels[inferMenuCategory(item)] || inferMenuCategory(item)}
                    </p>
                    <p className="mt-1 text-xs text-brand-cream/65">
                      {item.isAvailable ? 'La heli karo' : 'Lama heli karo'}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button variant="ghost" className="flex-1" onClick={() => handleOpen(item)}>
                    <SquarePen size={16} />
                    Wax ka beddel
                  </Button>
                  <Button variant="outline" className="flex-1 text-brand-error" onClick={() => handleDelete(item.id)}>
                    <Trash2 size={16} />
                    Tirtir
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="hidden overflow-x-auto p-4 sm:p-6 lg:block">
            <table className="min-w-full text-left text-sm">
          <thead className="text-brand-cream/55">
            <tr>
              <th className="pb-4">Cunto</th>
              <th className="pb-4">Qaybta</th>
              <th className="pb-4">Qiime</th>
              <th className="pb-4">Helitaan</th>
              <th className="pb-4">Ficillo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gold/10">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.foodName} className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <p className="font-medium text-white">{item.foodName}</p>
                      <p className="text-brand-cream/60">{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-brand-cream/75">
                  {menuCategoryLabels[inferMenuCategory(item)] || inferMenuCategory(item)}
                </td>
                <td className="py-4 text-brand-gold">{formatCurrency(item.price)}</td>
                <td className="py-4 text-brand-cream/75">{item.isAvailable ? 'La heli karo' : 'Lama heli karo'}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleOpen(item)} className="text-brand-gold">
                      <SquarePen size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-brand-error">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
            </table>
          </Card>
        </>
      )}

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={editingId ? 'Wax Ka Beddel Cuntada Menu-ga' : 'Ku Dar Cunto Cusub'}
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="field-label">Magaca Cuntada</label>
            <input value={form.foodName} onChange={(e) => setForm({ ...form, foodName: e.target.value })} />
          </div>
          <div>
            <label className="field-label">Sharaxaad</label>
            <textarea
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Qaybta Menu-ga</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full"
            >
              {menuItemCategories.map((category) => (
                <option key={category} value={category}>
                  {menuCategoryLabels[category]}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Qiime</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-brand-cream/90">
                Sawirka Cuntada (kombiyuutarkaaga → Cloudinary)
              </label>
              <ImageUploadField
                imageUrl={form.imageUrl}
                uploading={uploadingImage}
                onFileSelect={handleImageUpload}
                onClear={() => setForm((current) => ({ ...current, imageUrl: '' }))}
              />
            </div>
          </div>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
              className="h-4 w-4 rounded"
            />
            U furan dalabyada
          </label>
          <Button type="submit" loading={submitting}>
            {editingId ? 'Cusboonaysii Cuntada' : 'Samee Cuntada'}
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default ManageMenu

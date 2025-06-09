import {
  getColor,
  createColor,
  updateColor,
  deleteColor
} from '../../store/colors'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { useState, useEffect, useCallback } from 'react'
import { FTable, FHeader, ColorDialog, SearchBar } from '../../components'
import { Color, Header } from '../../utils'
import { Box } from '@mui/material'

const headers: Header[] = [
  { name: 'id', text: 'ID' },
  { name: 'name', text: 'Tên' },
  { name: 'action', text: '' }
]

export default function ColorPage() {
  const dispatch = useDispatch<AppDispatch>()
  const colors = useSelector((state: RootState) => state.colors.data) // ✅ Đúng key: 'colors'

  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [curColor, setCurColor] = useState<Color>({ id: 0, name: '' })

  useEffect(() => {
    dispatch(getColor())
  }, [dispatch])

  const onAdd = () => {
    setCurColor({ id: 0, name: '' })
    setIsOpenDialog(true)
  }

  const onUpdate = useCallback(
      (id: number) => {
        const color = colors.find(c => c.id === id)
        if (color) {
          setCurColor(color)
          setIsOpenDialog(true)
        }
      },
      [colors]
  )

  const onDelete = (id: number) => {
    dispatch(deleteColor(id))
  }

  const onSave = () => {
    setIsOpenDialog(false)

    if (curColor.id) {
      dispatch(updateColor({
        colorId: curColor.id,
        editedColor: { name: curColor.name }
      }))
    } else {
      dispatch(createColor({ name: curColor.name }))
    }
  }

  return (
      <>
        <FHeader title={'Colors'} />
        <Box sx={{ maxWidth: 500, margin: 'auto' }}>
          <SearchBar onAdd={onAdd} />
          <FTable headers={headers} rows={colors} onUpdate={onUpdate} onDelete={onDelete} />
          <ColorDialog
              color={curColor}
              setColor={setCurColor}
              onSave={onSave}
              isOpen={isOpenDialog}
              onClose={() => setIsOpenDialog(false)}
          />
        </Box>
      </>
  )
}

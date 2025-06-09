import { FTable, FHeader, CustomerDialog, SearchBar } from '../../components'
import { Customer, Header } from '../../utils'
import { Box } from "@mui/material"
import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '../../store/customers'
import { RootState, AppDispatch } from '../../store'

const headers: Header[] = [
  { name: 'id', text: 'ID' },
  { name: 'name', text: 'Tên' },
  { name: 'companyName', text: 'Công Ty' },
  { name: 'address', text: 'Địa Chỉ' },
  { name: 'description', text: 'Mô Tả' },
  { name: 'action', text: '' }
]

export default function CustomerPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { data: customers } = useSelector((state: RootState) => state.customers)

  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [curCustomer, setCurCustomer] = useState<Customer>({
    id: 0,
    name: '',
    companyName: '',
    address: '',
    description: ''
  })

  useEffect(() => {
    dispatch(getCustomers())
  }, [dispatch])

  const onAdd = () => {
    setCurCustomer({
      id: 0,
      name: '',
      companyName: '',
      address: '',
      description: ''
    })
    setIsOpenDialog(true)
  }

  const onUpdate = useCallback((id: number) => {
    const customer = customers.find(c => c.id === id)
    if (customer) {
      setCurCustomer(customer)
      setIsOpenDialog(true)
    }
  }, [customers])

  const onDelete = (id: number) => {
    dispatch(deleteCustomer(id))
  }

  const onSave = () => {
    setIsOpenDialog(false)

    if (curCustomer.id) {
      dispatch(updateCustomer(curCustomer))
    } else {
      // @ts-ignore
      dispatch(createCustomer({
        name: curCustomer.name,
        companyName: curCustomer.companyName,
        address: curCustomer.address,
        description: curCustomer.description
      }))
    }
  }

  return (
      <>
        <FHeader title={'Customers'} />
        <Box className={'container'}>
          <SearchBar onAdd={onAdd} />
          <FTable
              headers={headers}
              rows={customers}
              onUpdate={onUpdate}
              onDelete={onDelete}
          />
          <CustomerDialog
              customer={curCustomer}
              setCustomer={setCurCustomer}
              onSave={onSave}
              isOpen={isOpenDialog}
              onClose={() => setIsOpenDialog(false)}
          />
        </Box>
      </>
  )
}

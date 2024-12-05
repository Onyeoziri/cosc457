import { DataTable } from '@/components/table_logic/data-table'
import { supabase } from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$id/purchaseOrder')({
  component: RouteComponent,
})

function RouteComponent() {
  const purchaseOrderType = {
    id: '',
    supplierId: '',
    orderDate: '',
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['purchaseOrders'],
    queryFn: async () => {
      const { data, error } = await supabase.from('PurchaseOrder').select('*')
      if (error) throw error

      return data
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {(error as Error).message}</p>

  return (
    <div>
      <h1>Hello "/id/purchase-orders"!</h1>
      <DataTable type={purchaseOrderType} data={data || []} />
    </div>
  )
}
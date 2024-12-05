import { DataTable } from '@/components/table_logic/data-table'
import { supabase } from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$id/orderItem')({
  component: RouteComponent,
})

function RouteComponent() {
  const orderItemType = {
    id: '',
    purchaseOrderId: '',
    ingredientId: '',
    quantity: 0,
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['orderItems'],
    queryFn: async () => {
      const { data, error } = await supabase.from('OrderItem').select('*')
      if (error) throw error

      return data
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {(error as Error).message}</p>

  return (
    <div>
      <h1>Hello "/id/order-items"!</h1>
      <DataTable type={orderItemType} data={data || []} />
    </div>
  )
}

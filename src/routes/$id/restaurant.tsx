import { DataTable } from '@/components/table_logic/data-table'
import { supabase } from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$id/restaurant')({
  component: RouteComponent,
})

function RouteComponent() {
  const RestaurantType = {
    id: '',
    name: '',
    location: '',
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurant'],
    queryFn: async () => {
      const { data, error } = await supabase.from('Restaurant').select('*')
      if (error) throw error

      return data
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {(error as Error).message}</p>

  return (
    <div>
      <h1 className="text-center text-4xl mb-6">Ordered Items</h1>
      <DataTable type={RestaurantType} data={data || []} />
    </div>
  )
}

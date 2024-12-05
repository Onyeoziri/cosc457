import { DataTable } from '@/components/table_logic/data-table'
import { supabase } from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$id/assets')({
  component: RouteComponent,
})

function RouteComponent() {
  const assetType = {
    id: '',
    name: '',
    purchasePrice: 0,
    purchaseDate: '',
    businessAffiliated: '',
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const { data, error } = await supabase.from('Assets').select('*')
      if (error) throw error

      return data
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {(error as Error).message}</p>

  return (
    <div>
      <h1>Hello "/id/assets"!</h1>
      <DataTable type={assetType} data={data || []} />
    </div>
  )
}

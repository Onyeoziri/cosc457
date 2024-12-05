import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$id/assetMaintenance')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/id/assetMaintenance"!</div>
}

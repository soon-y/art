import VisitDetailPage from '@/pages/visit-detail-client'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return (
    <VisitDetailPage id={id} />
  )
}

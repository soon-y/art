import DetailPage from '@/pages/detail-client'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return (
    <DetailPage id={id} />
  )
}
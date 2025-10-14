export default async function Page(props: PageProps<'/chat/[id]'>) {
	const { id } = await props.params
	return <div>{id}</div>
}

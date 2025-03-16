
type HeaderProps = {
    title: string,
    description?: string
}

const Header = ({title, description}: HeaderProps) => {
  return (
    <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-neutral-500">{description}</p>
    </div>
  )
}

export default Header
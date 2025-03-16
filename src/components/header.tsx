
interface HeaderProps{
    title: string;
    description?: string
}

const Header = ({title, description}: HeaderProps) => {
  return (
    <div>
        <h2 className="text-lg">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Header
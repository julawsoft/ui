import { Container, Painel, TextItemMenu } from './styled'

interface PropsMenuItem {
  icon: any
  text: string
  isActive: boolean
  isShow: boolean
  onClick?: any
  isDisabled: boolean
}

export function MenuItem({
  icon,
  text,
  isActive,
  isShow,
  onClick,
  isDisabled,
}: PropsMenuItem) {
  return (
    <Container
      isDisabled={isDisabled}
      isActive={isActive}
      isShow={isShow}
      onClick={onClick}
    >
      <Painel isActive={isActive} isShow={isShow}>
        {icon}
        <TextItemMenu isShow={isShow}>{text}</TextItemMenu>
      </Painel>
    </Container>
  )
}

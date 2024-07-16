import { Socials } from './socials'

export function Login() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
      <div className="w-full text-left">
        <p className="pb-2 text-xl font-medium">Entre com sua conta</p>
        <p className="text-sm text-muted-foreground">
          Cadastre-se para uma nova conta para começar
        </p>
      </div>
      <Socials />
    </div>
  )
}

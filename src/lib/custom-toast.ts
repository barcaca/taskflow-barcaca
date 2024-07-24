import { toast } from 'sonner'

export type State = {
  message?: string | null
  status?: number
}

/**
 * A function to display custom toast messages based on HTTP status codes.
 *
 * @param data - An object containing the HTTP status code and an optional message.
 * @param data.status - The HTTP status code.
 * @param data.message - An optional message to display in the toast. If not provided, a default message will be used.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * customToast({ status: 404, message: 'Page not found' });
 * ```
 */
export function customToast(data: State) {
  setTimeout(() => {
    switch (data.status) {
      case 200:
        toast.success(data.message || 'Operação bem-sucedida.')
        break
      case 201:
        toast.success(data.message || 'Recurso criado com sucesso.')
        break
      case 204:
        toast.info(data.message || 'Nenhum conteúdo para mostrar.')
        break
      case 400:
        toast.error(
          data.message ||
            'Solicitação inválida. Verifique os dados fornecidos.',
        )
        break
      case 401:
        toast.error(
          data.message || 'Não autorizado. Verifique suas credenciais.',
        )
        break
      case 403:
        toast.error(
          data.message ||
            'Proibido. Você não tem permissão para realizar esta ação.',
        )
        break
      case 404:
        toast.error(data.message || 'Recurso não encontrado.')
        break
      case 409:
        toast.error(data.message || 'Conflito. Verifique os dados fornecidos.')
        break
      case 429:
        toast.warning(
          data.message || 'Muitas solicitações. Tente novamente mais tarde.',
        )
        break
      case 500:
        toast.error(
          data.message ||
            'Erro interno no servidor. Tente novamente mais tarde.',
        )
        break
      case 503:
        toast.warning(
          data.message || 'Serviço indisponível. Tente novamente mais tarde.',
        )
        break
      default:
        toast.error(data.message || 'Erro desconhecido.')
        break
    }
  }, 100)
}

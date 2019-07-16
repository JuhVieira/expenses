export const errorLoginMessage = (codeError) => {
    switch (codeError) {
        case 'auth/invalid-email':
            return { title: 'Email inválido', message: 'Por favor digite um email válido.' }
        case 'auth/wrong-password':
            return { title: 'Senha errada', message: 'Por favor verifique sua senha e tente novamente.' }
        case 'auth/user-not-found':
            return { title: 'Usuário não encontrado', message: 'Por favor verifique seu email e tente novamente.' }
        case 'auth/weak-password':
            return { title: 'Senha inválida', message: 'Sua senha precisa ter no mínimo 6 caracteres' }
        case 'auth/email-already-in-use':
            return { title: 'Email inválido', message: 'O endereço de e-mail já está sendo usado por outra conta.' }
        default:
            return { title: 'Erro', message: 'Algo de errado aconteceu, tente novamente.' }
    }
}
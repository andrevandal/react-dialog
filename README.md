# React Dialog Component

Este projeto é referente ao desafio técnico para desenvolver um componente Dialog UI usando React. Este repositório inclui o componente Dialog, exemplos de uso, estilos e testes automatizados para garantir a melhor experiência do usuário.

O Dialog tem duas camadas, uma que ocupa toda a tela e não permite interação com o conteúdo que esconde, e outra onde o conteúdo é apresentado. O componente controla sua exibição de acordo com a prop `isOpen` e aceita um callback `onClose` para diferentes ações do usuário.

## Demonstração

Acesse a demonstração do componente Dialog em nossa aplicação Cloudflare Pages: https://react-dialog.pages.dev/

## Requisitos

- Node.js (v20+)
- pnpm

## Instalação

Clone o repositório para sua máquina local:

```
git clone https://github.com/andrevandal/react-dialog.git
```

Instale as dependências:

```
pnpm install
```

## Uso

Para iniciar o ambiente de desenvolvimento, execute o seguinte comando:

```
pnpm run dev
```

O projeto estará disponível em `http://localhost:5173/`.

## Testes

Para executar os testes automatizados, utilize o comando:

```
pnpm run test
```

## Como utilizar o componente Dialog

Para usar o componente `Dialog` em seu projeto, importe-o e utilize como no exemplo:

```jsx
import Dialog from './components/Dialog';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Abrir Dialog</button>
      <Dialog title="Título do Dialog" isOpen={isOpen} onClose={handleClose} closeOnOverlayClick>
        Conteúdo do Dialog
      </Dialog>
    </>
  );
};
```

O componente espera as seguintes props:

- `title` *(string?)* - Conteúdo a ser apresentado na parte superior do conteúdo do Dialog, com formatação diferenciada. **Não é obrigatória**.
- `isOpen` *(boolean)* - Diz se o Dialog está aberto (quando `true`) ou não (quando `false`). **Obrigatória**.
- `onClose` *(function)* - Ação de callback sempre que o Dialog for fechado. **Obrigatória.**
- `closeOnOverlayClick` *(boolean)* - Quando `true`, permitirá que o Dialog seja fechado quando o usuário clicar no overlay. **Obrigatória.**
- `children` *(`React.ReactNode`?)*: **conteúdo do Dialog. **Não é obrigatória.**

## Contribuições

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um Fork do repositório.
2. Crie uma branch com um nome descritivo das suas alterações.
3. Faça as modificações.
4. Escreva e execute testes.
5. Faça um commit das mudanças.
6. Envie um Pull Request para este repositório.
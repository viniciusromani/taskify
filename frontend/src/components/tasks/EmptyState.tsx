import { ListTodo } from "lucide-react";

function EmptyState() {
  return (
    <div
      className="flex flex-col flex-1 text-center pt-12"
      data-cy="empty-container"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full flex items-center justify-center">
          <ListTodo className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
        </div>
      </div>
      <h3
        className="text-lg sm:text-xl font-semibold text-foreground mb-3"
        data-cy="empty-title"
      >
        Sem tarefas cadastradas
      </h3>
      <p
        className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed"
        data-cy="empty-description"
      >
        Verifique o filtro selecionado ou crie uma tarefa através do botão "+"
        no topo da tela. Organize sua rotina agora mesmo!
      </p>
    </div>
  );
}

export { EmptyState };

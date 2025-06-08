import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Settings, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Task {
  id: string;
  label: string;
  completed: boolean;
  dueDate?: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    label: 'Review and make sure nothing slips through cracks',
    completed: false,
    dueDate: '15 Sep, 2021',
  },
  {
    id: '2',
    label: 'Send meeting invites for sales upcampaign',
    completed: true,
    dueDate: '20 Sep, 2021',
  },
  {
    id: '3',
    label: 'Weekly closed sales won checking with sales team',
    completed: false,
    dueDate: '24 Sep, 2021',
  },
  {
    id: '4',
    label: 'Add notes that can be viewed from the individual view',
    completed: true,
    dueDate: '27 Sep, 2021',
  },
  {
    id: '5',
    label: 'Move stuff to another page',
    completed: false,
    dueDate: '30 Sep, 2021',
  },
  {
    id: '6',
    label: 'Follow up with high-priority leads',
    completed: false,
    dueDate: '02 Oct, 2021',
  },
   {
    id: '7',
    label: 'Prepare Q4 sales strategy document',
    completed: true,
  },
  {
    id: '8',
    label: 'Update CRM with recent client interactions',
    completed: false,
  },
  {
    id: '9',
    label: 'Schedule team performance review meeting',
    completed: false,
    dueDate: '10 Oct, 2021',
  },
  {
    id: '10',
    label: 'Finalize marketing budget for next year',
    completed: false,
    dueDate: '15 Oct, 2021',
  },
];

const TasksWidget: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleTaskToggle = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    // In a real app, this would open a modal or an inline form
    const newTaskLabel = prompt("Enter new task label:");
    if (newTaskLabel) {
        const newTask: Task = {
            id: String(Date.now()),
            label: newTaskLabel,
            completed: false,
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <Settings className="h-4 w-4 text-muted-foreground" />
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-1">
            {completedTasks} of {totalTasks} remaining
          </p>
          <Progress value={progressPercentage} className="h-1.5" />
        </div>
        <ScrollArea className="h-[220px] pr-3 -mr-3"> {/* Adjust height as needed */}
          <ul className="space-y-3">
            {tasks.map(task => (
              <li key={task.id} className="flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <Checkbox 
                    id={`task-${task.id}`} 
                    checked={task.completed} 
                    onCheckedChange={() => handleTaskToggle(task.id)}
                    className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label 
                    htmlFor={`task-${task.id}`} 
                    className={cn(
                        "text-sm font-medium leading-tight",
                        task.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {task.label}
                  </label>
                </div>
                {task.dueDate && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {task.dueDate}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Button onClick={handleAddTask} className="w-full mt-4 bg-success hover:bg-success/90 text-success-foreground">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </CardContent>
    </Card>
  );
};

export default TasksWidget;

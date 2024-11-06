import { useAuth } from './context/AuthProvider'; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import http from "./http/http";
import { Button } from '@/components/ui/button';

type FormValues = {
    title: string;
};

function AddTodoForm() {
    const auth = useAuth(); 
    const userId = auth?.userI?.id; 
    const queryClient = useQueryClient();

    const form = useForm<FormValues>();

    const addTodo = useMutation({
        mutationFn: (body: { title: string; userId: string }) =>
            http.post<{ title: string; userId: string }>("todo", body).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (!userId) return;

        addTodo.mutateAsync({ title: data.title, userId });
        form.reset(); 
    };

    return (
        <Form {...form} >
            <form className="flex grow" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem >
                            {/* <FormLabel></FormLabel> */}
                            <FormControl className="flex grow rounded-s-md w-80 grow border border-gray-400 p-2 bg-white">
                                <Input 
                                    placeholder="What needs to be done?"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button>Add</Button>
            </form>
        </Form>
    );
}

export default AddTodoForm;

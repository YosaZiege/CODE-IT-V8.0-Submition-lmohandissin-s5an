import { cn } from "@/lib/utils"
import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import Login from "./Login"

export function LoginForm({
   className,
   ...props
}: React.ComponentProps<"div">) {
   return (
      <div className={cn("flex flex-col gap-6 h-full", className)} {...props}>
         <Card>
            <CardHeader className="text-center">
               <CardTitle className="text-xl">Welcome back</CardTitle>
               <CardDescription>
                  <Login />
               </CardDescription>
            </CardHeader>
         </Card>
         <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
         </div>
      </div>
   )
}

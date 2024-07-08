import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter

}from "../ui/card"
import { Button } from "../ui/button"

const CardWrapper = ({ title, subtitle, submitBtnTxt, children}) => {
  return (
    <Card className='xl:w-1/4 md:w-1/2 shadow-md'>

        <CardHeader className="flex flex-col justify-center items-center">

            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">{subtitle}</CardDescription>

        </CardHeader>

        <CardContent>
            { children }
        </CardContent>

        <CardFooter>
            <Button className="w-full">{submitBtnTxt}</Button>
        </CardFooter>

    </Card>
  )
}

export default CardWrapper
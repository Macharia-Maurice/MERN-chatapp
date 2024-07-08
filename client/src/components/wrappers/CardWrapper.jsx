import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,

} from "../ui/card"

const CardWrapper = ({ title, subtitle, error, children }) => {
    return (
        <Card className='xl:w-1/4 md:w-1/2 shadow-md'>

            <CardHeader className="flex flex-col justify-center items-center">

                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">{subtitle}</CardDescription>

            </CardHeader>

            <CardContent>
                {children}
            </CardContent>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        </Card>
    )
}

export default CardWrapper
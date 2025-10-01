import { Card } from "antd"
import LoadingComponent from "./Loading"

const LoadingModel = ({text = 'Loading...', loaderSize}:{text?:string, loaderSize?:'sm' | 'md' | 'lg' | 'xl'}) => {
    return (
        <div className="w-screen h-screen flex justify-center items-center absolute z-50 bg-black/10 backdrop-blur-xs">
            <Card className="w-[200px] h-[200px] flex justify-center items-center">
                <LoadingComponent text={text} className="" size={loaderSize as 'sm' | 'md' | 'lg' | 'xl'} />
            </Card>
        </div>
    )
}

export default LoadingModel
const Logo = ({className, collapsed = false}:{className?:string,collapsed?:boolean}) => {
    return (
        <div className={"flex justify-center items-center text-4xl font-bold text-[#F65F42] " + " " + className}>
            <h1 className={""}>{collapsed ? "MP" : "Micro Pizza" }</h1>
        </div>
    )
}
export default Logo
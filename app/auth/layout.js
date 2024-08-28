import SideImage from "../components/Forms/SideImage";

export default function layout({ children }) {
    return (
        <>
            <div className="h-screen flex flex-row justify-start bg-[#e2e8f0]">
                    {children}
            </div>
        </>
    );
}
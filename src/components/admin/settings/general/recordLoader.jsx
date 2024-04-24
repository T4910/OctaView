import { TableCell, TableRow } from "@/components/ui/table"
import { Triangle } from 'react-loader-spinner'


const Loader = () => {
    return (
        // <TableBody>
            <TableRow>
                    <TableCell className="font-medium underline" asChild colSpan={11}>
                        <div className="w-full py-16 p-8 grid place-content-center place-items-center">
                            <Triangle
                                visible={true}
                                height="100"
                                width="100"
                                color="#000000"
                                ariaLabel="triangle-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    </TableCell>
            </TableRow>
        // </TableBody>
    );
};

export default Loader;
import { ProgressSpinner} from 'primereact/progressspinner'
export default function LoadingAnimate() {
    return(
        <div className="flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <ProgressSpinner style={{width: '60px', height: '60px'}} strokeWidth='8'/>
        </div>
    )
}
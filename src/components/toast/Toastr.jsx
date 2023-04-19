import { useRef }      from 'react';
import { Button }      from 'primereact/button';

export const ToastrComponent = () => {
    const toastSC    = useRef(null);

    const showConfirm = ({messageTitle='', handleSucces}) => {
        toastSC.current.show({ severity: 'warn', sticky: true, content: (
              <div className="flex flex-column w-full" style={{flex: '1'}}>
                  <div className="text-center">
                      <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                      <h4>{ messageTitle }</h4>
                  </div>
                  <div className="flex p-fluid mt-1">
                      <div className="col-6">
                          <Button 
                            label="Sí" 
                            className="p-button-success" 
                            // onClick={()=>dispatch(logout())}
                            onClick={()=>handleSucces()}
                          />
                      </div>
                      <div className="col-6">
                          <Button
                           label="No" 
                           className="p-button-secondary" 
                           onClick={()=>toastSC.current.clear()}
                          />
                      </div>
                  </div>
              </div>
          ) });
    }

  return {
    toastSC,
    showConfirm
  }
}


import c from "../../../constGlobal.ts";
import ExcelExport from "../ExcelExport.js";

import React, { Component } from "react";
import axios from "axios";


export default class ToExcelFilter extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
 
    this.state = {
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
     
      configFilter : {
        config:{
          select:["*"],
          distinct:true,
          orderBy:"apellido",
          where1:{column:"",operator:"",value:""},
          where2:{column:"",operator:"",value:""}
        }
      }
     
    };

  }

  componentDidMount() {// call on loaded Component
    this.props.onStateChange(this.state.configFilter);
  }
  
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    const { configFilter } = this.state;
    if (name.indexOf("where") !== -1){
      let where = e.target.dataset.val;
      configFilter["config"][name][where] = value;
    }else if(e.target.type=="checkbox"){
      value = e.target.checked;
      configFilter["config"][name] = value;
    }
    else if(name=="select"){
      configFilter["config"][name] = value.split(',');
    }
    else{
      configFilter["config"][name] = value;
    }
    this.setState(configFilter);

    this.props.onStateChange(this.state.configFilter);
  };

  filter = (e) => {
    this.onChangehandler(e);
    this._parent.getBeneficiaries();
  }
  render() {
   
    return (
      
      <>
        <div className="table-responsive">
          <div className='d-flex justify-content-center m-1'>
              <ExcelExport  
               dataBeneficiaries={this._parent.state.dataBeneficiaries}
               dataKeysBeneficiaries={this._parent.state.dataKeysBeneficiaries}
              />
              <select name="orderBy" className={"bordered ms-2"} value={this.state.configFilter.config.orderBy} onChange={this.filter} style={{"width":"100px"}}>
                  
                  {this._parent.state.dataKeysBeneficiaries &&  Object.keys(this._parent.state.dataKeysBeneficiaries).map((key,i) =>(
                      <option key={i} value={key}>{key}</option>
                  ))}
                  </select>
              <label htmlFor="distinct" className="text-center ms-2">No repetir</label>
              <input id="distinct" type="checkbox" name="distinct" onChange={this.onChangehandler} checked={this.state.configFilter.config.distinct} onClick={this._parent.getBeneficiaries}/>
              <button className='btn btn-success btn-sm  ms-2' onClick={this._parent.getBeneficiaries}>Filtrar</button>
          </div>
        </div>
        <div className="container overflow-auto">
            <div className="row flex-nowrap justify-content-center">
                <select name="where1" data-val="column" className={"bordered col-3 col-md-2"} value={this.state.configFilter.config.where1.column} onChange={this.onChangehandler} >
                <option hidden={true} value="0"></option>
                <option value="">None</option>
                {this._parent.state.dataKeysBeneficiaries &&  Object.keys(this._parent.state.dataKeysBeneficiaries).map((key,i) =>(
                    <option key={i} value={key}>{key}</option>
                ))}
                </select>
                <select name="where1" data-val="operator" className={"bordered col-3 col-md-2"} value={this.state.configFilter.config.where1.operator} onChange={this.onChangehandler}>
                <option hidden={true} value="0"></option>
                <option value="">None</option>
                <option value="=">=</option>
                <option value="!=">!=</option>
                <option value="like">like</option>
                <option value="not like">not like</option>
                <option value="<">{"<"}</option>
                <option value=">">{">"}</option>
                <option value=">=">{">="}</option>
                <option value="<=">{"<="}</option>
                </select>
                <input type="text" name="where1" data-val="value" className="bordered col-6 col-md-4" value={this.state.configFilter.config.where1.value} onChange={this.onChangehandler} />
            </div>
            <div className="row flex-nowrap justify-content-center mt-1">
                <select name="where2" data-val="column" className={"bordered col-3 col-md-2"} value={this.state.configFilter.config.where2.column} onChange={this.onChangehandler}>
                <option hidden={true} value="0"></option>
                <option value="">None</option>
                {this._parent.state.dataKeysBeneficiaries &&  Object.keys(this._parent.state.dataKeysBeneficiaries).map((key,i) =>(
                    <option key={i} value={key}>{key}</option>
                ))}
                </select>
                <select name="where2" data-val="operator" className={"bordered col-3 col-md-2"} value={this.state.configFilter.config.where2.operator} onChange={this.onChangehandler}>
                <option hidden={true} value="0"></option>
                <option value="">None</option>
                <option value="=">=</option>
                <option value="!=">!=</option>
                <option value="like">like</option>
                <option value="not like">not like</option>
                <option value="<">{"<"}</option>
                <option value=">">{">"}</option>
                <option value=">=">{">="}</option>
                <option value="<=">{"<="}</option>
                </select>
                <input type="text" name="where2" data-val="value" className="bordered col-6 col-md-4" value={this.state.configFilter.config.where2.value} onChange={this.onChangehandler} />
            </div>
        </div>
        <div className='d-flex justify-content-center mt-1 mb-1'>
            <textarea type="text" className={"bordered"} name="select" value={this.state.configFilter.config.select.join(",")}
            style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
            onChange={this.onChangehandler}
            />
        </div>
       
      </>
    );
  }
}
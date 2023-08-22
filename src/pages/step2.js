import React, {useState, useEffect} from 'react';
import Http from "../../utils/Http";
import { id } from 'ethers/lib/utils';
const Step2 = ({chooseProject, project}) => {
    const [networkType, setNetworkType] = useState('all');
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedId, setSelectedId] = useState(0);
    const [isReadMore, setIsReadMore] = useState(true);
    const mediaUrl = "https://static.nodigy.com/";

    const filterByNet = async(netType) => {
        setNetworkType(netType);
        const formData = new FormData();
        formData.append('network_type', netType);
        const result = await Http.post('/admin/api/filterNetworkProjects', formData);
        setProjects(result.data.projectlist);
    };

    const selectProject = (idx) => {
        const _selectedProject = projects[idx];
        setSelectedProject(_selectedProject);
        setSelectedId(_selectedProject.id);
        chooseProject(_selectedProject);
    }

    const getProjects = async() => {
        const _projects = await Http.get('admin/api/getAllProjects');
        setProjects(_projects.data.projectlist);
    }

    const selectReadMore = (idx) => {
        console.log("idx", idx);
        let _projects = [...projects];
        if(_projects[idx].readmore) {
            _projects[idx].readmore = false;
        }else{
            _projects[idx].readmore = true;
        }
        setProjects(_projects);
    }

    useEffect(()=>{
        getProjects();
        if(project){
            setSelectedId(project.id);
        }
    }, []);

    return (
        <div className="steps-content step-new step2 step2new">
            <div className="container">
                <div className="title">Choose a web3 project to validate</div>
                <div className="desc">
                    <p>Attention! It's crucial to DYOR things before you start!  Do Your Own Research — analytical materials, articles, project docs, and social media will help. Dive into the project's story and perspectives before making any investment decision. I'm just a deployment wizard who's not competent enough to do it for you.</p>
                    <p>You might see some projects double each other at this stage. Pay attention to their status — it could be mainnet or testnet, and they'll have different conditions for validators.</p>
                </div>
                <div className="step2_filter">
                    <a onClick={()=>filterByNet('all')} className={networkType=='all'?"active":""}>All Projects</a>
                    <a onClick={()=>filterByNet('test')} className={networkType=='test'?"active":""}>Testnet</a>
                    <a onClick={()=>filterByNet('main')} className={networkType=='main'?"active":""}>Mainnet</a>
                </div>
                <div className="borerbox">
                    <div className="row">
                        {projects.length > 0 && projects.map((project, i) => {
                            return(
                                <div className="col-sm-6" key={i}>
                                    <div className={ selectedId == project.id ? "items item1 border-up checked" : "items item1 border-up"} onClick={()=>selectProject(i)}>
                                        <div className="innerbox transparentbg">
                                            <div className="box-head">
                                                <div className="img"><img src={mediaUrl + 'project_image/'+project.image} /></div>
                                                <div className="name">{project.project_name}</div>
                                                {project.type == 'main' && <div className="tag"><span className="mainnet">Mainnet</span></div>}
                                                {project.type == 'test' && <div className="tag"><span className="testnet">Testnet</span></div>}
                                            </div>
                                            <div className="box-content">
                                                <p>{ project.readmore==true ? project.description.slice(0, 100)+"..." : project.description }<a className="read-or-hide" onClick={() => selectReadMore(i)}> { project.readmore ? "Learn more..." : "Show less"}</a></p>
                                                <div className="minstake">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Min stake:</td>
                                                                <td className="text-right">{project.min_stake}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="2" className="text-right">~ {project.min_price}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="2" className="text-right"><span className="setupfee">Setup fee  ~ {project.setup_fee}</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Step2;
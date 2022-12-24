import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState();
  const [dataDetails, setDataDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(true);

  const url = 'https://602e7c2c4410730017c50b9d.mockapi.io/users'

  useEffect(() => {
    load();
  }, [])

  const load = () => {

    setLoading(true);
    axios.get(url).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => console.log(err))
  }
  
  const showDetails = (e) => {
    setLoadingDetail(true);
    const id = e.target.id;
    const x = document.getElementsByClassName('list-group-item-action');
    Array.from(x).forEach(element => {
      if (element.classList.contains('active')) {
        
        element.classList.remove('active')
      }
    });
    e.target.classList.add('active');
    
    axios.get(url).then(res => {
      setDataDetails(res.data.filter(element => element.id === id));
      setLoadingDetail(false);
    }).catch(err => console.log(err))
    
    
  }
  
  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-lg-4 mx-auto text-center">

            <div className="list-group-item list-group-item-primary my-3">USERS LIST</div>
            {loading && <ReactLoading type={'spokes'} color={"black"} height={'10%'} width={'10%'} />}
            {data ? data.map(element => {
              return <div key={element.id} >
                <div className="group">
                  <ul className="list-group">
                    <li style={{ cursor: "pointer" }} id={element.id} onClick={showDetails} className="list-group-item list-group-item-action">{element.profile.firstName + " " + element.profile.lastName}</li>
                  </ul>
                </div>
              </div>

            }) : <div>No data to show</div>}

          </div>
          <div className="col-lg-6 mx-auto text-center">
            {dataDetails && <div>

              <div id="info">
                <div className="list-group-item list-group-item-primary my-3">USERS DETAILS</div>
                {loadingDetail && <ReactLoading type={'spokes'} color={"black"} height={'8%'} width={'8%'} />}

                {dataDetails ? dataDetails.map(element => {
                  return <div key={element.id} >
                    <img className="image my-3" src={element.avatar} alt="Not Available" />
                    <h5>@{element.profile.username}</h5>
                    <div className="group">
                      <ul className="list-group">
                        <li className="list-group-item">{element.Bio}</li>
                        <li className="list-group-item">Full Name : {element.profile.firstName + " " + element.profile.lastName}</li>
                        <li className ="list-group-item">Job Title : {element.jobTitle}</li>
                        <li className="list-group-item">Email : {element.profile.email}</li>
                      </ul>
                    </div>
                  </div>

                }) : <div>No data to show</div>}
              </div>

            </div>}
          </div>
        </div>
      </div>
    </>

  );
}

export default App;

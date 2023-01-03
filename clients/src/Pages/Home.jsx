import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Home = () => {
    return ( 
        <Row>
            <Col md={6} className="my-5  text-center d-flex flex-direction-column align-items-center justify-content-center">
                <div className="content">
                <label id="title" className="lead">Let's Connect <br />to the whole world</label>
                    <p id="text" className="my-3"><b className="text-danger">CHRONOS ChatApp</b> let you communicate with the whole world</p>
                <div className="container text-start">
                    <Link to="/chat" className="">
                    <button className="btn btn-danger">Let's Chat  <i class="bi bi-chat-dots mx-2"></i></button>
                    </Link>
                </div>
                </div>

            </Col>

            <Col md={6} className="text-center">
                <div id="image"></div>
            </Col>

        </Row>
     );
}
 
export default Home;
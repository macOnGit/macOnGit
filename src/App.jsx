import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Routes, useLocation } from 'react-router-dom';
import TemplateForm from './components/composeTemplateForm';
import Welcome from './components/welcome';
import SiteNav from './components/nav';
import AutoHideToast from './components/autoHideToast';
import TemplateTable from './components/templateTable';
import Template from './components/useTemplateForm';
import NotFound from './components/notFound';
import MyVerticallyCenteredModal from './components/modal';

function App() {
  const [toastData, setToastData] = useState({
    show: false,
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    title: "this is a title",
    body: "this is body text",
  });
  const [templates, setTemplates] = useState([
    {
      id: 1,
      template_name: 'first template',
      template_text: 'Hi there __!',
      template_author: 'Fred',
    },
    {
      id: 2,
      template_name: 'second template',
      template_text: 'Good Morning',
      template_author: 'Anonymous',
    },
  ]);
  const location = useLocation();
  return (
    <>
      <SiteNav />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalData={modalData}
      />
      <ToastContainer style={{ zIndex: 100 }} position="top-end">
        <AutoHideToast setToastData={setToastData} toastData={toastData} />
      </ToastContainer>
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route
                path="/compose"
                element={
                  <TemplateForm
                    templates={templates}
                    setTemplates={setTemplates}
                    setToastData={setToastData}
                  />
                }
              />
              <Route path="/templates">
                <Route
                  index
                  element={<TemplateTable templates={templates} />}
                />
                <Route
                  path="/templates/:id"
                  element={
                    <Template
                      setModalShow={setModalShow}
                      templates={templates}
                      setToastData={setToastData}
                      setModalData={setModalData}
                    />
                  }
                />
                <Route
                  path="/templates/:id/edit"
                  element={
                    <TemplateForm
                      templates={templates}
                      setTemplates={setTemplates}
                      setToastData={setToastData}
                      forEditing
                    />
                  }
                />
              </Route>
              <Route path="/compiled" element={<pre>{location.state}</pre>} />
              <Route
                path="/edit"
                element={
                  <TemplateTable
                    templates={templates}
                    loadTemplateEndpoint="edit"
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

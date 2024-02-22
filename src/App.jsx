import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Routes } from 'react-router-dom';
import TemplateForm from './components/templateForm'
import Welcome from './components/welcome';
import SiteNav from './components/nav';
import AutoHideToast from './components/autoHideToast';
import TemplateTable from './components/templateTable';
import TemplateWithFields from './components/templateWithFields';
import NotFound from './components/notFound';
import MyVerticallyCenteredModal from './components/modal';

function App() {
  const [toastData, setToastData] = useState({
    show: false,
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [templates, setTemplates] = useState([
    {
      id: 1,
      template_name: 'Example Template',
      template_text: 'Hi! My name is __. My favorite food is __.',
      template_author: 'Anonymous',
    },
  ]);
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
                    <TemplateWithFields
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

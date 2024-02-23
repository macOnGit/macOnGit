import Card from 'react-bootstrap/Card';

const Welcome = () => (
  <>
    <Card bg="info" className="text-center">
      <Card.Title style={{ padding: '1rem' }} as="h1">
        Welcome to QuickFields
      </Card.Title>
    </Card>

    <Card className="my-1" border="info">
      <Card.Header>Navigation</Card.Header>
      <Card.Body>
        <ul className="instructions">
          <li>Click Templates to generate text from or edit an existing template.</li>
          <li>Click Create to create a new template.</li>
        </ul>
      </Card.Body>
    </Card>
    <Card className="my-1" border="info">
      <Card.Header>Composing Templates</Card.Header>
      <Card.Body>
        <p>
          Enter a name and author (optional) then enter
          text in the Template Text area. Type two underscores to create a field.
          Click Submit when finished.
        </p>
      </Card.Body>
    </Card>
    <Card className="my-1" border="info">
      <Card.Header>Using Templates</Card.Header>
      <Card.Body>
        <p>
          Select a template then enter text into fields.
          A live preview is shown above the fields. Click Compile
          to generate the text with the fields.
        </p>
      </Card.Body>
    </Card>
    <Card className="my-1" border="info">
      <Card.Header>Editing Templates</Card.Header>
      <Card.Body>
        <p>
          Select a template, click edit button,
          then click Submit to save your edits or Delete to remove
          the template.
        </p>
      </Card.Body>
    </Card>
  </>
);

export default Welcome;

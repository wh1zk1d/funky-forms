import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'

import '../styles.css'

const Summary = ({ values }) => {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setPrice(0)

    // Site category
    switch (values.siteCategory) {
      case 'static':
        setPrice(price => price + 500)
        break
      case 'cms':
        setPrice(price => price + 1000)
        break
      case 'ecommerce':
        setPrice(price => price + 2000)
        break
      default:
        break
    }

    // Pages
    switch (values.pages) {
      case 'small':
        setPrice(price => price + 150)
        break
      case 'medium':
        setPrice(price => price + 500)
        break
      case 'large':
        setPrice(price => price + 1000)
        break
      default:
        break
    }

    // Features
    if (values.features.contactForm) setPrice(price => price + 150)
  }, [values])

  return (
    <div>
      <h2>Summary</h2>

      {/* DEBUGGING ONLY – REMOVE BEFORE FLIGHT */}
      <pre style={{ border: '2px solid red', padding: '10px' }}>{JSON.stringify(values, null, 2)}</pre>
      {/* /DEBUGGING ONLY */}

      {/* SUMMARY LIST */}
      {/* <ul>
        <li>{values.siteCategory === 'static' && 'Statische Seite'}</li>
      </ul> */}

      {/* PRICE */}
      <strong>
        So ca. <span style={{ color: 'tomato' }}>{new Intl.NumberFormat('de-DE').format(price)}€</span> würde dich der
        ganze Bums kosten
      </strong>
    </div>
  )
}

const Frontpage = () => (
  <div>
    <h1>Projektanfrage</h1>
    <Formik
      initialValues={{
        name: '',
        email: '',
        company: '',
        type: '',
        pages: '',
        features: {
          contactForm: false,
        },
      }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {({ values }) => (
        <div>
          <Form>
            <label htmlFor='name'>Name</label>
            <Field id='name' name='name' placeholder='Name' />

            <label htmlFor='email'>E-Mail</label>
            <Field id='email' name='email' type='email' placeholder='E-Mail' />

            <label htmlFor='company'>Firma</label>
            <Field id='company' name='company' placeholder='Firma' />

            <label htmlFor='type'>Art der Seite</label>
            <Field as='select' id='type' name='type'>
              <option defaultValue value=''>
                -- Bitte wählen --
              </option>
              <option value='static'>Statische Seite</option>
              <option value='cms'>WordPress Seite</option>
              <option value='shop'>Shop</option>
            </Field>

            <h3>Anzahl der Unterseiten</h3>
            <label htmlFor='pages-small'>
              <Field type='radio' name='pages' id='pages-small' value='small' />
              1-3
            </label>

            <label htmlFor='pages-medium'>
              <Field type='radio' name='pages' id='pages-medium' value='medium' />
              3-5
            </label>

            <label htmlFor='pages-large'>
              <Field type='radio' name='pages' id='pages-large' value='large' />
              5-7
            </label>

            <h3>Zusätzliche Funktionen</h3>
            <label htmlFor='contact-form'>
              <Field type='checkbox' name='features.contactForm' id='contact-form' />
              Kontaktformular (150€)
            </label>

            <button type='submit'>Senden</button>
          </Form>

          {/* Summary */}
          <Summary values={values} />
        </div>
      )}
    </Formik>
  </div>
)

export default Frontpage

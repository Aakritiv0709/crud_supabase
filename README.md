### Scope:

This SOP applies to all frontend developers working within the organization or on this projects.

### Procedures:

1. **Project Setup and Configuration**
   - Initialize the Next.js project using `create-next-app`.
   - Set up version control using Git and establish a repository on platforms like GitHub, GitLab, or Bitbucket.
   - Configure linters (e.g., ESLint) and formatters (e.g., Prettier) to enforce coding standards.
2. **Development Workflow**
   - Use a consistent branching strategy (e.g., Git Flow or GitHub Flow).
   - Regularly pull from the main branch to keep your feature branch up-to-date.
   - Write modular, reusable components.
   - Use environment variables for sensitive data and configuration settings.
3. **Coding Standards**
   - Follow a predefined coding style guide (e.g., Airbnb JavaScript Style Guide).
   - Write meaningful comments and maintain documentation for complex logic.
   - Ensure the use of semantic HTML and accessible web practices.
4. **Use of Next.js Features**
   - Leverage server-side rendering (SSR) or static generation (SSG) as appropriate for the project.
   - Utilize Next.js API routes for backend integration when needed.
   - Implement dynamic routing efficiently.

<!--! List of  VS extension -->

1. Prettier (Required)
2. Auto Close Tag (Optional)
3. Better Comment (Optional)
4. Import Cost (Required)

## Naming

- **Extensions**: Use `.js` extension for React components.
- **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.js`.
- **Reference Naming**: Use PascalCase for React components and camelCase for their instances. eslint: `[react/jsx-pascal-case](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)` \*`// bad**\*import** reservationCard **from** './ReservationCard';
\*// good**\*import** ReservationCard **from** './ReservationCard';
\*// bad**\*const** ReservationItem **=** <**ReservationCard** />;
\*// good**\*const** reservationItem **=** <**ReservationCard** />;`
- **Component Naming**: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name: \*`// bad**\*import** Footer **from** './Footer/Footer';
\*// bad**\*import** Footer **from** './Footer/index';
\*// good**\*import** Footer **from** './Footer';`
- **Higher-order Component Naming**: Use a composite of the higher-order component’s name and the passed-in component’s name as the `displayName` on the generated component. For example, the higher-order component `withFoo()`, when passed a component `Bar` should produce a component with a `displayName` of `withFoo(Bar)`.

  > Why? A component’s displayName may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.
  > \*`// bad**\*export** **default** **function** withFoo(WrappedComponent) {
  > **return** **function** WithFoo(props) {
  > **return** <**WrappedComponent** {...props} foo />;
  > }
  > }
  > \*// good**\*export** **default** **function** withFoo(WrappedComponent) {
  > **function** WithFoo(props) {
  > **return** <**WrappedComponent** {...props} foo />;
  > }

      **const** wrappedComponentName **=** WrappedComponent.displayName
        **||** WrappedComponent.name
        **||** 'Component';

      WithFoo.displayName **=** `withFoo(${wrappedComponentName})`;
      **return** WithFoo;

  }`

- **Props Naming**: Avoid using DOM component prop names for different purposes.
  > Why? People expect props like style and className to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs. \*`// bad**\*<**MyComponent style**=**"fancy" **/>\***// bad\*<**MyComponent** className="fancy" />
_// good_<**MyComponent** variant="fancy" />`

## Props

- Always use camelCase for prop names. \*`// bad**\*<**Foo
UserName**=**"hello"
phone_number**=**{12345678}
/>
\*// good**\*<**Foo
userName**=**"hello"
phoneNumber**=**{12345678}
/>`
- Omit the value of the prop when it is explicitly `true`. eslint: `[react/jsx-boolean-value](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)` \*`// bad**\*<**Foo
hidden**=**{**true**}
/>
\*// good**\*<**Foo
hidden
**/>\***// good\*<**Foo** hidden />`
- Always include an `alt` prop on `<img>` tags. If the image is presentational, `alt` can be an empty string or the `<img>` must have `role="presentation"`. eslint: `[jsx-a11y/alt-text](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)` \*`// bad**\*<**img src**=**"hello.jpg" **/>\***// good\*<img src="hello.jpg" alt="Me waving hello" />
_// good_<img src="hello.jpg" alt="" />
_// good_<img src="hello.jpg" role="presentation" />`
- Do not use words like “image”, “photo”, or “picture” in `<img>` `alt` props. eslint: `[jsx-a11y/img-redundant-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)`
  > Why? Screenreaders already announce img elements as images, so there is no need to include this information in the alt text. \*`// bad***<**img src**=**"hello.jpg" alt**=**"Picture of me waving hello" **/>***// good*<img src="hello.jpg" alt="Me waving hello" />`
- Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/roles#role_definitions). eslint: `[jsx-a11y/aria-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)` \*`// bad - not an ARIA role**\*<**div role**=**"datepicker" **/>\***// bad - abstract ARIA role\*<div role="range" />
_// good_<div role="button" />`
- Do not use `accessKey` on elements. eslint: `[jsx-a11y/no-access-key](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)`

> Why? Inconsistencies between keyboard shortcuts and keyboard commands used by people using screenreaders and keyboards complicate accessibility.

`*// bad***<**div accessKey**=**"h" **/>***// good*<div />`

- Avoid using an array index as `key` prop, prefer a unique ID. ([why?](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318))

  `_// bad_{todos.map((todo, index) **=>**<**Todo**{...todo}
  key={index}
  />
  )}

  _// good_{todos.map(todo **=>** (
  <**Todo**{...todo}
  key={todo.id}
  />
  ))}`

- Always define explicit defaultProps for all non-required props.

> Why? propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

`\*// bad**\*function** SFC({ foo, bar, children }) {
**return** <div>{foo}{bar}{children}</div>;
}
SFC.propTypes **=** {
foo: PropTypes.number.isRequired,
bar: PropTypes.string,
children: PropTypes.node,
};

\*// good**\*function** SFC({ foo, bar, children }) {
**return** <div>{foo}{bar}{children}</div>;
}
SFC.propTypes **=** {
foo: PropTypes.number.isRequired,
bar: PropTypes.string,
children: PropTypes.node,
};
SFC.defaultProps **=** {
bar: '',
children: **null**,
};`

- Use spread props sparingly.
  > Why? Otherwise you’re more likely to pass unnecessary props down to components. And for React v15.6.1 and older, you could pass invalid HTML attributes to the DOM.

Exceptions:

- HOCs that proxy down props and hoist propTypes

  `**function** HOC(WrappedComponent) {
  **return** **class** Proxy **extends** React.Component {
  Proxy.propTypes **=** {
  text: PropTypes.string,
  isLoading: PropTypes.bool
  };

      render() {
        **return** <**WrappedComponent** {...this.props} />
      }

  }
  }`

- Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha’s beforeEach construct.

  `**export** **default** **function** Foo {
  **const** props **=** {
  text: '',
  isPublished: **false**}

  **return** (<div {...props} />);
  }`

Notes for use: Filter out unnecessary props when possible. Also, use [prop-types-exact](https://www.npmjs.com/package/prop-types-exact) to help prevent bugs.

`*// good*render() {
**const** { irrelevantProp, ...relevantProps } **=** **this**.props;
**return** <**WrappedComponent** {...relevantProps} />
}

*// bad*render() {
**const** { irrelevantProp, ...relevantProps } **=** **this**.props;
**return** <**WrappedComponent** {...this.props} />
}`

## Tags

- Always self-close tags that have no children. eslint: `[react/self-closing-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)` \*`// bad**\*<**Foo variant**=**"stuff"**>**</**Foo**>
// good
<**Foo** variant="stuff" />`

## Methods

- Use arrow functions to close over local variables.
  **`function** ItemList(props) {
  **return** (
  <ul>
  {props.items.map((item, index) **=>** (
  <**Item**key={item.key}
  onClick={() **=>** doSomethingWith(item.name, index)}
  />
  ))}
  </ul>
  );
  }`
- Do not use underscore prefix for internal methods of a React component.
  > Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public. See issues #1024, and #490 for a more in-depth discussion.
  > *`// bad*React.createClass({
  > \_onClickSubmit() {
  > _// do stuff_},
      *// other stuff*});
  \*// good**\*class** **extends** React.Component {
  onClickSubmit() {
  _// do stuff_}
  _// other stuff_}`
- Be sure to return a value in your `render` methods. eslint: `[react/require-render-return](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)`
  *`// bad*render() {
  (<div />);
  }
  *// good*render() {
  **return** (<div />);
  }`

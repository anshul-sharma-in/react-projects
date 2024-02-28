import React from "react";
import "./DynamicForm.css";
class DynamicForm extends React.Component {
 state = {
   formData: [],
   formDataValues: {},
   error: null,
   formVisible: false,
 };
 handleFileChange = (event) => {
   const file = event.target.files[0];
   const reader = new FileReader();
   reader.onload = (e) => {
     try {
       const json = JSON.parse(e.target.result);
       this.setState({ formData: json, formVisible: true, error: null });
     } catch (error) {
       this.setState({ error: "Invalid JSON format", formVisible: false });
     }
   };
   reader.readAsText(file);
 };
 handleChange = (event) => {
   const { id, value } = event.target;
   this.setState((prevState) => ({
     formDataValues: {
       ...prevState.formDataValues,
       [id]: value,
     },
   }));
 };
 handleSubmit = (event) => {
   event.preventDefault();
   // Handle form submission
   console.log("Form submitted with data:", this.state.formDataValues);
 };
 renderFormFields = () => {
   const { formDataValues, formData } = this.state;
   return formData.map((field, index) => {
     return (
       <div key={index} className="form-field">
         <label htmlFor={field.id}>{field.label}</label>
         {field.type === "text" ? (
           <input
             type="text"
             id={field.id}
             value={formDataValues[field.id] || ""}
             onChange={this.handleChange}
           />
         ) : field.type === "dropdown" ? (
           <select
             id={field.id}
             value={formDataValues[field.id] || ""}
             onChange={this.handleChange}
           >
             <option value="">Select {field.label}</option>
             {field.options.map((option, optionIndex) => (
               <option key={optionIndex} value={option.value}>
                 {option.label}
               </option>
             ))}
           </select>
         ) : field.type === "radio" ? (
           field.options.map((option, optionIndex) => (
             <div key={optionIndex} className="radio-option">
               <input
                 type="radio"
                 id={`${field.id}-${optionIndex}`}
                 name={field.id}
                 value={option.value}
                 checked={formDataValues[field.id] === option.value}
                 onChange={this.handleChange}
               />
               <label htmlFor={`${field.id}-${optionIndex}`}>{option.label}</label>
             </div>
           ))
         ) : null}
       </div>
     );
   });
 };
 render() {
   const { error, formVisible } = this.state;
   return (
     <div className="dynamic-form">
       <input type="file" accept=".json" onChange={this.handleFileChange} />
       {error && <div className="error">{error}</div>}
       {formVisible && (
         <form onSubmit={this.handleSubmit}>
           {this.renderFormFields()}
           <button type="submit">Submit</button>
         </form>
       )}
     </div>
   );
 }
}
export default DynamicForm;
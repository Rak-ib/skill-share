const BasicInfoStep = ({ formData, handleChange, nextStep }) => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Step 1: Basic Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            disabled
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={formData.description}
            onChange={handleChange}
            disabled
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="startingDate"
            placeholder="starting date"
            value={formData.startingDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="endingDate"
            placeholder="ending date"
            value={formData.endingDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="level"
            placeholder="Level (Beginner, Intermediate, Advanced)"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            disabled
            className="w-full p-2 border rounded"
          />
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="TK">TAKA</option>
          </select>
        </div>
        <button
          onClick={nextStep}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default BasicInfoStep;
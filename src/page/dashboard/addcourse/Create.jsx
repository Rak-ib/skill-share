import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import USeAxioseSecure from "../../../hooks/USeAxioseSecure";
import UseAuth from "../../../hooks/UseAuth";



const Create = () => {
      //From Custom Hook
      const auth = UseAuth();
      const { user } = auth;
  
    const service = useLoaderData();
    const {_id } = service;
    console.log(_id)
    const axiosSecure=USeAxioseSecure()

    // const [numberOfInstructor,setInstructor]=useState(1);
  //   const [numberOfFields, setNumberOfFields] = useState(1);
  // const [inputValues, setInputValues] = useState(['']);
  const [fields, setField] = useState([{ instructor_name: '', instructor_image: '',instructor_specialties:'' },])
  const [links, setLinks] = useState([])
  const [mod_num, setMod_num] = useState(1)


  const [modules, setModules] = useState([{
    module_id: '',
    module_name: ' ',
    module_video: ' ',
    video_link: links,
    module_liveClass: ' ',
  }])
  const handleCourse =async (e) => {
    

    e.preventDefault();
    const form = e.target;
    // console.log('hello')
    const course_id = form.price.value;
    const course_name = form.course_name.value;
    const course_description=form.description.value;
    const Course_image=form.course_image.files[0]; 

    //Course Image
    const courseImageData = new FormData();
    courseImageData.append('file', Course_image);
    courseImageData.append('upload_preset', 'kcig1ito');
    courseImageData.append('cloud_name', 'dcao1wljw');
    const courseImageResponse = await fetch('https://api.cloudinary.com/v1_1/dcao1wljw/image/upload', {
      method: 'POST',
      body: courseImageData,
    });
    const courseImageResult = await courseImageResponse.json();
    // const courseImageUrl = courseImageResult.secure_url;

    const course_image = courseImageResult.secure_url;
    const number_of_instructor = form.number_of_instructor.value
    const instructors = fields

    const starting_date = form.starting_date.value;
    const ending_data = form.ending_data.value;
    const num_std = form.num_std.value;
    const num_mod = form.num_mod.value;
    const num_cls = form.num_cls.value;
    const mobile = form.mobile.value;
    const facebook = form.facebook.value;
    const price = form.price.value;
    const Modules = modules;
    const ID=_id;
    const email=user.email;
    const students=[];
    const Everycourse = {email,ID,course_id, course_name,course_description, course_image, number_of_instructor, instructors, starting_date,ending_data, num_std, price, num_mod,num_cls,mobile,facebook, Modules ,students};
    console.log(Everycourse)

    axiosSecure.post('/courses', Everycourse)
    .then(res=>{
       console.log(res.data)
       if(res.data.insertedId){
           alert('Course Added Successfully');
       } else {
            // Application already exists or other error
             alert(res.data.message);
          }
          
    })
        
    // const fun=(e)=>{
    //     const count = parseInt(e.target.value, 10) || 0;
    //     setNumberOfFields(count);
    //     setInputValues(new Array(count).fill(''));
    // }
    // const handleInputChange = (index, value) => {
    //     const newInputValues = [...inputValues];

    //     newInputValues[index] = value;
    //     setInputValues(newInputValues);
    //   };

  }
  const fun = (e, index) => {
    let newField = [...fields]
    if(e.target.name=='instructor_image'){
      const file = e.target.files[0];

    // Upload video to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kcig1ito');
    formData.append('cloud_name', 'dcao1wljw');
    fetch('https://api.cloudinary.com/v1_1/dcao1wljw/image/upload', {
        method: 'POST',
        body: formData,
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data.secure_url);
        newField[index][e.target.name] = data.secure_url
      })
      .catch(err=>{
        console.log(err);
      })
    }
    else{
      newField[index][e.target.name] = e.target.value;
    }
    
    setField(newField)
    // console.log(fields);
  }

  const fun1 = () => {
    const moduleObj = {
      module_id: '',
      module_name: ' ',
      module_video: ' ',
      video_link: links,
      module_liveClass: ' ',
      liveClass_date:' '
    }
    setModules([...modules, moduleObj])
    setMod_num(modules.length + 1)
  }

  const fun2 = (e, index) => {
    let Modules = [...modules]
    // console.log(index,Modules,e)
    Modules[index][e.target.name] = e.target.value
    // console.log("kar index=", index, "kar name=", e.target.name, "helllllll", Modules[index][e.target.name])
    setModules(Modules)
    // console.log(modules)

    // setModules(Modules)

  }
  const fun_2 = (e, index) => {
    let Modules = [...modules]
    // console.log(index,Modules,e)
    Modules[index][e.target.name] = e.target.value
    setModules(Modules)
    const j = parseInt(e.target.value)
    // console.log(typeof(j))
    setLinks([])
    let newlink = []
    for (let i = 0; i < j; i++) {
      // console.log(i);
      newlink.push({
        video_number: '',
        video_topic: '',
        video_link: ''
      })

    }
    setLinks(newlink)
    // console.log(links)


  }


  const fun3 = (e, index, index2) => {
    console.log('hello world');
    console.log(e.target.name);
    const Links = [...links]
    // const file = e.target.files[0];
    // console.log("videofiles= ", file);
    if(e.target.name=="video_link"){
      console.log("nice ");
      const file = e.target.files[0];

    // Upload video to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kcig1ito');
    formData.append('cloud_name', 'dcao1wljw');

    fetch('https://api.cloudinary.com/v1_1/dcao1wljw/video/upload', {
        method: 'POST',
        body: formData,
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data.secure_url);
        Links[index][e.target.name] = [data.secure_url]
      })
      .catch(err=>{
        console.log(err);
      })

      // const result =response.json();
    }
    else{
      Links[index][e.target.name] = [e.target.value]
    }
    
    setLinks(Links)
    // console.log("links=",links)
    const Modules = [...modules]
    Modules[index2]['video_link'] = links
    setModules(Modules)
    // setLinks([])
    // console.log("modules=",modules)
  }

  const create = () => {
    let newfield = {
      instructor_name: '',
      instructor_image: ''
    }
    setField([...fields, newfield])
  }
  return (
    <div className="w-[70%] mx-auto bg-base-400">
      <div className="hero h-[300px] bg-yellow-600 rounded-xl ">
        <div className="hero-content text-center">
          <div className="text-white"  >
            <h1 className="text-5xl font-bold">Create Your Dream Course</h1>
            <p className="py-6">Unlock your potential and share your knowledge with the world</p>
           
          </div>
        </div>
      </div>
      <form className="border-2 text-xl flex flex-col gap-y-4 mt-10 border-none font-bold" onSubmit={handleCourse}>
        
        <div className="flex flex-row gap-10 align-middle ">
        <label className="block text-gray-700 mt-1 ">Course Name: </label>
          <input className="h-10 w-[82%] rounded-2xl px-4" type="text" name="course_name" placeholder="Course name" id="" />
        </div>
        <div className="flex flex-row gap-10 mt-4">
        <label className="block text-gray-700 ">Upload Your Course Banner:</label>
        <input type="file" required name="course_image" placeholder="Course_image" id="" />
        </div>
        <textarea name="description"  placeholder="About Your Course..." className="w-full h-32 rounded-2xl mt-4 p-2 border  overflow-y-auto"></textarea>
        
        <label  className="block text-white text-2xl mx-[38%] mt-10  rounded-3xl px-4 py-2 bg-yellow-500 mb-[-2px]">Instructor Details</label>
        <div className="flex flex-row gap-10 mt-2">
          <label >Total Instructors</label>
          <input className="h-8 required px-3 rounded-xl w-auto" type="number" name="number_of_instructor" placeholder="number_of_instructor" id="" />
        </div>
        {
          fields.map((field, index) => {
            return (
              <div key={field} className="border-2 px-4 py-8 rounded-2xl my-4" >
                <label className="block text-white rounded-3xl px-4 py-2 text-xl mx-[42.5%]   mb-7 bg-yellow-500 ">Instructor {index+1}</label>
                <div className="flex flex-row gap-32 ">
                <div className="flex flex-row justify-between gap-10">
                <label className="block text-gray-700  ">Instructor Name : </label>
                  <input  type="text"  placeholder="Instructor Name" name="instructor_name" className="rounded-xl mt-1 h-10 px-3 border-1 border-yellow-600"  onChange={(e) => fun(e, index)} id="" /></div>
                <div className="flex flex-row justify-between gap-10">
                <label className="block text-gray-700  ">Instructor Specialties: </label>
                <input type="text" required placeholder="Specialties" name="instructor_specialties" className="rounded-xl mt-1 h-10 px-3 border-yellow-600" onChange={(e) => fun(e, index)} id="" />
                </div>
                </div>
                <div className=" mt-10 flex flex-row gap-16">
                <label  className="block text-gray-700 mb-[10px]">Instructor image:</label>
                <input type="file" required name="instructor_image" onChange={(e) => fun(e, index)} id="" />
                </div>
              </div>
            )
          })
        }



        <p className="ml-[40%] mr-[40%] text-center hover:cursor-pointer border-2 border-yellow-600 rounded-xl hover:bg-yellow-600 hover:text-white " onClick={create}>+ add more</p>
        <div className="flex flex-row gap-10 mt-16">
        <label  className="block text-gray-700 mr-4 ">Starting Date :</label>
        <input type="date" name="starting_date" className="border-2  h-10 rounded-xl mr-10 px-4" placeholder="starting date" id="" />
        <label  className="block text-gray-700 mr-4">Ending Date :</label>
        <input type="date" name="ending_data" className="border-2 h-10 rounded-xl px-4" placeholder="ending date" id="" />
        </div>
        

        <div className="flex flex-row mt-8">
        <label  className="block text-gray-700  mr-20 ">Total Seat:</label>
        <input className="h-10 rounded-xl w-[82%] px-4" type="number" name="num_std" placeholder="Number of students" id="" /><br />
        </div>
        <div className="flex flex-row mt-8">
        <label className="block text-gray-700 mr-14">Course Price:</label>
        <input className="h-10 rounded-xl w-[82%] px-4" type="number" name="price" placeholder="price" id="" /><br />
        </div>
        <div className="flex flex-row mt-8">
        <label className="block text-gray-700 mr-16">Total Module:</label>
        <input className="h-10 rounded-xl w-[81.4%] ml-[-8px] px-4" type="text" name="num_mod" placeholder="Number of modules" id="" /><br />
        </div>
        <div className="flex flex-row mt-8">
        <label className="block text-gray-700 mr-16"> Total Class :</label>
        <input className="h-10 rounded-xl w-[80.8%] ml-2 px-4" type="text" name="num_cls" placeholder="Number of Live Classes" id="" /><br />
        </div>
        <div className="flex flex-row mt-8">
        <label className="block text-gray-700 mr-3 "> Total Assignment:</label>
       
        <input className="h-10 rounded-xl px-4  w-[81%]" type="text" name="num_assignment" placeholder="Number of Assignment" id="" /><br />
        </div>
        <div className="flex flex-row mt-8">
        <label className="block text-gray-700 mr-10"> Contact Number:</label>
        <input className="h-10 rounded-xl w-[80%] ml-[-20px] px-4" type="text" name="mobile" placeholder="Mobile Number"/><br />
        </div>
        <div className="flex flex-row mt-8">
        <label className="block text-gray-700 mr-9"> Facebook Page:</label>
        <input className="h-10 rounded-xl w-[80%] px-4" type="text" name="facebook" placeholder="Facebook Page link" id="" />
</div>

        <label className="block text-white text-2xl mx-[38%] mt-10  rounded-3xl pl-8 py-2 bg-yellow-500 mb-[-2px]"> Module Details</label>

        {
          modules.map((module, index) => {
            return (
              <div key={index} className=" mt-10 flex flex-col gap-y-2 border-1 border-black">
                <p className="block text-white rounded-3xl pl-8 py-2 text-xl mx-[42.5%]   mb-7 bg-yellow-500">Module {index + 1}</p>
                <div className="flex flex-row gap-5 mt-5">
                  <label className="">Module no. :</label>
                <input className="h-10 rounded-xl px-4" type="text" placeholder="module number" name="module_id" onChange={e => fun2(e, index)} id="" /><br />
                <label className=" mr-4">Module Topic :</label>
                <input required className="h-10 rounded-xl px-4" type="text" placeholder="module topic" name="module_name" onChange={e => fun2(e, index)} id="" /><br />
                </div>
                <div className="flex flex-row mt-5">
                <label className=" mr-4">Module Videos :</label>
                <input className="h-10 w-[80%] rounded-xl px=4" type="text" placeholder="num of video" name="module_video" onChange={e => fun_2(e, index)} id="" /><br />
                </div>
                
                {
                  links.map((link, indx) => {
                    return (
                      <div key={indx} className=" flex  mt-16 flex-col gap-y-1 border-1 border-black">
                        <div className="flex flex-row justify-between ">
                          <label className="mr-4">Video no.:</label>
                        <input required className="mr-8 h-10 rounded-xl px-4" type="text" name="video_number" onChange={e => fun3(e, indx, index)} id="" />
                        <label className="mr-4">Video Topic:</label>
                        <input required className="mr-8 h-10 rounded-xl px-4" type="text" name="video_topic" onChange={e => fun3(e, indx, index)} id="" />
                        </div>
                        <div className="mt-4">
                          <label className="mr-4" >Upload Video: </label>
                        <input className="h-10" type="file" required name="video_link" onChange={e => fun3(e, indx, index)} id="" />
                        </div>
                      </div>
                    )
                  })
                }


                <div className="flex  flex-row gap-4 mt-10">
                  <label htmlFor="">Module live class:</label>
                <input className="h-10 rounded-xl px-4" type="text" placeholder="num of live class" name="module_liveClass" onChange={e => fun2(e, index)} id="" />
                <label  className="block text-gray-700 mr-5">liveClass_date: </label>
                <input className="h-10 rounded-xl " type="date" name="liveClass_date" onChange={e => fun2(e, index)} id="" />
                </div>
                <div className="flex flex-row mt-4">
                
                </div>
              </div>
            )
          })
        }
        <p className="ml-[40%] mr-[40%] text-center hover:cursor-pointer border-2 border-yellow-600 rounded-xl hover:bg-yellow-600 hover:text-white " onClick={fun1}>+ add module{mod_num + 1}</p>

        <input className=" bg-black p-4   text-white" type="submit" value="submit" />
      </form>

    </div>
  );
};

export default Create;
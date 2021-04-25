import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { useFormik } from "formik";
import { addProduct, fetchProducts } from './../../redux/Product/products.action'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { fetchCategories } from '../../redux/Category/category.action';
import axios from 'axios'
const mapState = ({ productsData }) => ({
    products: productsData.products
})

const mapCategory = ({ category }) => ({
    categories: category.categories
})

const validationSchema = Yup.object({
    name: Yup
        .string()
        .required('Vui lòng nhập tên sản phẩm'),
    category: Yup
        .string()
        .required('Vui chọn danh mục sản phẩm'),
    description: Yup
        .string()
        .required('Vui lòng nhập miêu tả sản phẩm'),
    price: Yup
        .string()
        .required('Vui lòng nhập giá'),
    number: Yup
        .string()
        .required('Vui lòng nhập số lượng sản phẩm'),

})
function FormProduct(props) {
    const { products } = useSelector(mapState);
    const { categories } = useSelector(mapCategory);
    const dispatch = useDispatch();
    const history = useHistory()
    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [imgvalid, setImgvalid] = useState('');

    const validateImg = (e) => {
        image || image1 || image2 == '' ? setImgvalid('Vui lòng chọn tệp ảnh đính kèm') : setImgvalid('');
    }

    useEffect(() => {
        dispatch(
            fetchProducts()
        );
    }, []);


    useEffect(() => {
        dispatch(
            fetchCategories()
        );
    }, []);

    const uploadImage = async (e) => {
        const files = e.target.files[0];
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'geekyimages')
        await axios.post('https://api.cloudinary.com/v1_1/ngochuan/image/upload', data)
            .then(
                res => setImage(res.data.secure_url)
            )
            .catch(err => console.log(err))

    }
    const uploadImage1 = async (e) => {
        const files = e.target.files[0];
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'geekyimages')
        await axios.post('https://api.cloudinary.com/v1_1/ngochuan/image/upload', data)
            .then(
                res => setImage1(res.data.secure_url)
            )
            .catch(err => console.log(err))

    }
    const uploadImage2 = async (e) => {
        const files = e.target.files[0];
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'geekyimages')
        await axios.post('https://api.cloudinary.com/v1_1/ngochuan/image/upload', data)
            .then(
                res => setImage2(res.data.secure_url)
            )
            .catch(err => console.log(err))

    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            category: '',
            description: '',
            price: '',
            number: '',
        },
        validationSchema,
        onSubmit: values => {
            validateImg();
            dispatch(
                addProduct({
                    thumbnail: image2,
                    imgDetail: image1,
                    imgDetail2: image,
                    name: values.name,
                    category: values.category,
                    description: values.description,
                    price: values.price,
                    number: values.number,
                })
            );
            formik.resetForm();
            swal("Thêm sản phẩm thành công!", "", "success");
            history.goBack()
        },
    });

    return (
        <div className="m-2">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label for="name">Tên sản phẩm</label>
                    <input className="form-control"
                        id='name'
                        type='text'
                        placeholder="Nhập tên sản phẩm"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>) : null}
                    {/* <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="name" placeholder="Nhập tên sản phẩm" /> */}
                </div>
                <div className="form-group">

                    <label for="category">Loại sản phẩm</label>
                    <select
                        className="form-control w-25"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ display: 'block' }}
                    >
                        <option value="">Chọn</option>
                        {categories.map((option) => (

                            <option value={option.name}>{option.name}</option>
                        ))}

                    </select>
                    {formik.touched.category && formik.errors.category ? (
                        <div>{formik.errors.category}</div>) : null}
                </div>
                <div className="form-group">
                    <label for="number">Số lượng sản phẩm</label>
                    <input className="form-control"
                        id='number'
                        type='number'
                        min='1'
                        placeholder="Nhập Số lượng sản phẩm"
                        value={formik.values.number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.number && formik.errors.number ? (
                        <div>{formik.errors.number}</div>) : null}
                </div>
                <div className="form-group">
                    <label for="description">Miêu tả sản phẩm</label>
                    <textarea className="form-control"
                        id='description'
                        type='text'
                        placeholder="Miêu tả sản phẩm"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.description && formik.errors.description ? (
                        <div>{formik.errors.description}</div>) : null}
                </div>
                <div className="form-group">
                    <label for="price">Giá sản phẩm</label>
                    <input className="form-control"
                        id='price'
                        type='text'
                        placeholder="Nhập Giá sản phẩm"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.price && formik.errors.price ? (
                        <div>{formik.errors.price}</div>) : null}

                </div>
                <div className="form-group w-50">
                    <label for="thumbnail">Ảnh sản phẩm</label><br></br>
                    <input type='file'
                        id='thumbnail'
                        name='file'
                        placeholder='upload image'
                        onChange={uploadImage2}></input><br></br>
                    <img className='img-thumbnail w-25' src={image2}></img>
                    <div value={imgvalid} className="error">{imgvalid}</div>

                </div>
                <div className="form-group w-50">
                    <label for="imgDetail">Ảnh chi tiết 1</label><br></br>
                    <input type='file'
                        id='imgDetail'
                        name='file'
                        placeholder='upload image'
                        onChange={uploadImage1}></input><br></br>
                    <img className='img-thumbnail w-25' src={image1}></img>
                </div>
                <div className="form-group w-50">
                    <label for="imgDetail2">Ảnh chi tiết 2</label><br></br>
                    <input type='file'
                        id='imgDetail2'
                        name='file'
                        placeholder='upload image'
                        onChange={uploadImage}></input><br></br>
                    <img className='img-thumbnail w-25' src={image}></img>

                </div>
                {/* <div className="form-group">
                    <label for="thumbnail">Hình ảnh sản phẩm</label>
                    <input className="form-control"
                        id='thumbnail'
                        type='text'
                        placeholder="Hình ảnh sản phẩm"
                        value={formik.values.thumbnail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.thumbnail && formik.errors.thumbnail ? (
                        <div>{formik.errors.thumbnail}</div>) : null}
                   
                </div>
                <div className="form-group">
                    <label for="imgDetail">Hình ảnh chi tiết 1</label>
                    <input className="form-control"
                        id='imgDetail'
                        type='text'
                        placeholder="Hình ảnh chi tiết"
                        value={formik.values.imgDetail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.imgDetail && formik.errors.imgDetail ? (
                        <div>{formik.errors.imgDetail}</div>) : null}
                   
                </div>
                <div className="form-group">
                    <label for="imgDetail2">Hình ảnh chi tiết 2</label>
                    <input className="form-control"
                        id='imgDetail2'
                        type='text'
                        placeholder="Hình ảnh chi tiết"
                        value={formik.values.imgDetail2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.imgDetail2 && formik.errors.imgDetail2 ? (
                        <div>{formik.errors.imgDetail2}</div>) : null}
                </div> */}

                <button className="btn btn-primary" disabled={!image || !image1 || !image2} type="submit">
                    Thêm sản phẩm
              </button>

            </form>
        </div>



    );
}

export default FormProduct;
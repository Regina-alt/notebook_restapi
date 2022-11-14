<?php

function getPosts($connect){
    $posts = mysqli_query($connect, "SELECT * FROM `book`");
    $postsList = [];
    while($post = mysqli_fetch_assoc($posts)){
        $postsList[] = $post;
    }
    echo json_encode($postsList);
}


function getPost($connect, $id){
    $post = mysqli_query($connect, "SELECT * FROM `book` WHERE `id_book` = '$id'");

    if(mysqli_num_rows($post) === 0){
        http_response_code(404);
        $res = [
            "status" => false,
            "message" => "Post not found"
        ];

        echo json_encode($res);

    } else {
        $post = mysqli_fetch_assoc($post);
        echo json_encode($post);
    }
}

function addPost ($connect, $data){

    

    $fio = $data['fio'];
    $company = $data['company'];
    $phone = $data['phone'];
    $email = $data['email'];

    $name = $_FILES['photo']['name'];
    $tmp_name = $_FILES['photo']['tmp_name'];
    move_uploaded_file($tmp_name, "../notebooktest.ru/uploads/" . $name);

    $data_b = strtotime($data['data_birthday']);
    $data_birthday = date("Y-m-d", $data_b);

    mysqli_query($connect, "INSERT INTO `book` (`id_book`, `fio`, `company`, `phone`, `email`, `photo`, `data_birthday`) VALUES (NULL,'$fio','$company','$phone','$email','$name', '$data_birthday')");

    http_response_code(201);

    $res = [
        "status" => true,
        "id_post" => mysqli_insert_id($connect)
    ];

    echo json_encode($res);
}


function deletePost($connect, $id){
    mysqli_query($connect, "DELETE FROM `book` WHERE `id_book`='$id'");

    http_response_code(200);

    $res = [
        "status" => true,
        "message" => "Post is deleted"
    ];

    echo json_encode($res);
}

?>
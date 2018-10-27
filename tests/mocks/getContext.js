export default function getContext() {
    return {
        "isLoading": false,
        "isSnackbarOpen": false,
        "selectedNode": {
            "id": "GET_200_nested",
            "isSelected": true,
            "label": {
                "key": null,
                "ref": null,
                "props": {
                    "description": "Nested level 2 contract set as default",
                    "isActive": true,
                    "method": "GET",
                    "status": 200
                },
                "_owner": null,
                "_store": {}
            }
        },
        "snackbarMessage": "",
        "store": {
            "fixtures": [
                {
                    "id": "DELETE_200_cheng",
                    "default": true,
                    "description": "Removes Cheng Ly",
                    "url": "/api/test",
                    "headers": {
                        "Content-Type": "text/plain"
                    },
                    "method": "DELETE",
                    "status": 200,
                    "data": "Ok",
                    "validator": {
                        "url": "http://localhost:3000/api/test",
                        "method": "DELETE",
                        "headers": {
                            "Content-Type": "text/plain"
                        }
                    }
                },
                {
                    "id": "GET_200_bhakti",
                    "description": "Gives you Bhakti Patel",
                    "url": "/api/test",
                    "method": "GET",
                    "status": 200,
                    "_handler": "function handler(req, res) {\n    res.json({\n      firstName: 'Bhakti',\n      lastName: 'Patel'\n    });\n  }"
                },
                {
                    "default": true,
                    "id": "GET_200_cheng-failed",
                    "description": "Gives you Cheng Ly with failed validation Gives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validation",
                    "url": "/api/test",
                    "method": "GET",
                    "status": 200,
                    "validator": {
                        "url": "http://localhost:3000/validation",
                        "headers": {
                            "Content-Type": "application/json"
                        }
                    },
                    "data": {
                        "firstName": "Cheng",
                        "lastName": "Ly",
                        "hair": {
                            "color": "black",
                            "length": 3
                        }
                    }
                },
                {
                    "description": "Gives you Cheng Ly using invalid validation url",
                    "url": "/api/test",
                    "method": "GET",
                    "status": 200,
                    "validator": {
                        "url": "http://localhost:3000/validations",
                        "headers": {
                            "Content-Type": "application/json"
                        }
                    },
                    "data": {
                        "firstName": "Cheng",
                        "lastName": "Ly",
                        "hair": {
                            "color": "black",
                            "length": 3
                        }
                    },
                    "id": "6ea44bc8-691a-4de3-9e71-fc669e1324c6"
                },
                {
                    "url": "/api/test",
                    "id": "9a0758b9-4382-4123-bb39-721c320614c1",
                    "method": "GET",
                    "status": 200,
                    "description": "No description added."
                },
                {
                    "description": "Uses special url",
                    "url": "/api/test/:id",
                    "method": "GET",
                    "status": 200,
                    "id": "23934c8f-a67a-4f06-a8ac-3a3f57580358",
                    "_handler": "function handler(req, res) {\n    var id = req.params.id;\n    return res.send(id);\n  }"
                },
                {
                    "description": "Failed request to retrieve a person",
                    "url": "/api/test",
                    "method": "GET",
                    "status": 400,
                    "data": {
                        "error": "No data"
                    },
                    "id": "14aedb17-e0bf-4312-8874-cba6645de502"
                },
                {
                    "id": "POST_200_CHENG",
                    "default": true,
                    "description": "Sets name",
                    "url": "/api/test",
                    "method": "POST",
                    "status": 200,
                    "data": {
                        "firstName": "Cheng",
                        "lastName": "Ly"
                    }
                },
                {
                    "description": "Endpoint does not exist",
                    "url": "/api/test2",
                    "method": "POST",
                    "validator": {
                        "url": "http://localhost:3000/notExist"
                    },
                    "data": {
                        "hello": "world"
                    },
                    "id": "af2a1b5b-e8ba-4fc6-9cee-39cabb83f477",
                    "status": 200
                },
                {
                    "description": "Updated that person",
                    "url": "/api/test",
                    "method": "PUT",
                    "status": 200,
                    "id": "3681a1a2-5b1a-49ed-84e3-9a7c399af156"
                },
                {
                    "id": "GET_200_nested",
                    "default": true,
                    "description": "Nested level 2 contract set as default",
                    "url": "/api/nested",
                    "method": "GET",
                    "status": 200,
                    "headers": {
                        "Content-Type": "text/plain"
                    },
                    "data": {
                        "firstName": "Cheng",
                        "lastName": "Ly"
                    }
                },
                {
                    "id": "GET_200_nested_2",
                    "description": "Nested level 3 fixture",
                    "url": "/api/nested2",
                    "method": "GET",
                    "status": 200
                }
            ],
            "latency": 50,
            "activeFixtures": {
                "DELETE": {
                    "/api/test": {
                        "id": "DELETE_200_cheng",
                        "default": true,
                        "description": "Removes Cheng Ly",
                        "url": "/api/test",
                        "headers": {
                            "Content-Type": "text/plain"
                        },
                        "method": "DELETE",
                        "status": 200,
                        "data": "Ok",
                        "validator": {
                            "url": "http://localhost:3000/api/test",
                            "method": "DELETE",
                            "headers": {
                                "Content-Type": "text/plain"
                            }
                        }
                    }
                },
                "GET": {
                    "/api/test": {
                        "id": "GET_200_bhakti",
                        "description": "Gives you Bhakti Patel",
                        "url": "/api/test",
                        "method": "GET",
                        "status": 200,
                        "_handler": "function handler(req, res) {\n    res.json({\n      firstName: 'Bhakti',\n      lastName: 'Patel'\n    });\n  }"
                    },
                    "/api/test/:id": {
                        "description": "Uses special url",
                        "url": "/api/test/:id",
                        "method": "GET",
                        "status": 200,
                        "id": "23934c8f-a67a-4f06-a8ac-3a3f57580358",
                        "_handler": "function handler(req, res) {\n    var id = req.params.id;\n    return res.send(id);\n  }"
                    },
                    "/api/nested": {
                        "id": "GET_200_nested",
                        "default": true,
                        "description": "Nested level 2 contract set as default",
                        "url": "/api/nested",
                        "method": "GET",
                        "status": 200,
                        "headers": {
                            "Content-Type": "text/plain"
                        },
                        "data": {
                            "firstName": "Cheng",
                            "lastName": "Ly"
                        }
                    },
                    "/api/nested2": {
                        "id": "GET_200_nested_2",
                        "description": "Nested level 3 fixture",
                        "url": "/api/nested2",
                        "method": "GET",
                        "status": 200
                    }
                },
                "POST": {
                    "/api/test": {
                        "id": "POST_200_CHENG",
                        "default": true,
                        "description": "Sets name",
                        "url": "/api/test",
                        "method": "POST",
                        "status": 200,
                        "data": {
                            "firstName": "Cheng",
                            "lastName": "Ly"
                        }
                    },
                    "/api/test2": {
                        "description": "Endpoint does not exist",
                        "url": "/api/test2",
                        "method": "POST",
                        "validator": {
                            "url": "http://localhost:3000/notExist"
                        },
                        "data": {
                            "hello": "world"
                        },
                        "id": "af2a1b5b-e8ba-4fc6-9cee-39cabb83f477",
                        "status": 200
                    }
                },
                "PUT": {
                    "/api/test": {
                        "description": "Updated that person",
                        "url": "/api/test",
                        "method": "PUT",
                        "status": 200,
                        "id": "3681a1a2-5b1a-49ed-84e3-9a7c399af156"
                    }
                }
            }
        },
        "theme": "bp3-dark",
        "useLastSavedActiveFixtures": true,
        "validations": {}
    }
};

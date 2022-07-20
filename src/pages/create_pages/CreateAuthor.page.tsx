import { CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Clickable from "../../components/wrapper_components/ButtonWrapperComponent";
import Color from "../../configs/ColorConfig";
import useErrorSnackbar from "../../hooks/useErrorSnackbar.hook";
import AuthorCreateRequest from "../../models/request_response_models/AuthorCreate.request";
import ErrorResponse from "../../models/request_response_models/Error.Response.model";
import ApiService from "../../services/ApiService";
import Text from "../../components/wrapper_components/Text.wrapperComponent";
import Title from "../../components/specified_components/text_components/Title.component";
import Input from "../../components/wrapper_components/Input.WrapperComponent";
import Author from "../../models/Author.Model";

const CreateAuthorPage = () => {
  const showErrorSnackBar = useErrorSnackbar();
  const [author, setAuthor] = useState<AuthorCreateRequest>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data } = useQuery(
    ["authors", id],
    () => {
      if (id !== undefined) {
        return ApiService.fetchAuthor(id);
      }
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        onSuccessfetchAuthor(response!);
      },
      onError: (error: AxiosError) => {
        showErrorSnackBar((error.response?.data as ErrorResponse).message);
      },
    }
  );

  const createMutation = useMutation(ApiService.addAuthor, {
    onSuccess: () => {
      navigate("/create/cookbook");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
    },
  });

  const updateMutation = useMutation(ApiService.updateAuthor, {
    onSuccess: () => {
      navigate("/create/cookbook");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
    },
  });

  const onSuccessfetchAuthor = (response: Author) => {
    const newAuthor: AuthorCreateRequest = {
      name: response.name,
    };
    setAuthor(newAuthor);
  };

  const validateAuthorName = (value?: string) => {
    if (value === undefined) {
      showErrorSnackBar("Fill in the author name");
      return false;
    }

    if (value === "") {
      showErrorSnackBar("Fill in the author name");
      return false;
    }

    if (value!.length < 2) {
      showErrorSnackBar("Author name length should be atleast 2 characters");
      return false;
    }
    return true;
  };

  const onInputBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAuthor({
      name: event.target.value,
    });
    validateAuthorName(event.target.value);
  };

  const onAddButtonClicked = () => {
    if (validateAuthorName(author?.name)) {
      createMutation.mutate(author!);
    }
  };

  const onUpdateButtonClicked = () => {
    if (author !== undefined && id !== undefined) {
      const newAuthor: Author = {
        name: author.name,
        _id: id,
      };
      if (validateAuthorName(author?.name)) {
        updateMutation.mutate(newAuthor);
      }
    }
  };

  const onAddNewCookbookClicked = () => {
    navigate("/create/cookbook");
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newAuthor: AuthorCreateRequest = {
      name: event.target.value,
    };
    setAuthor(newAuthor);
  };

  return (
    <div style={{ ...style.mainContainer, ...{ flexDirection: "column" } }}>
      <Title text="Create Author" />

      <div style={{ ...style.subContainer, ...{ flexDirection: "column" } }}>
        <div style={style.bodyContainer}>
          <Text variant={"body2"} color={""}>
            Author Name
          </Text>
          <div>
            <Input
              onChange={(event) => {
                onInputChange(event);
              }}
              onBlur={onInputBlur}
              type={"outlined"}
              placeHolderText={
                author?.name !== undefined ? undefined : "Enter the Author Name"
              }
              style={{ marginTop: "10px" }}
              errorText={""}
              value={author?.name !== undefined ? author?.name : undefined}
            />
          </div>
        </div>

        <div style={style.buttonContainer}>
          {!createMutation.isLoading ? (
            <>
              <div>
                <Clickable
                  ClickableText={
                    id !== undefined ? "Update Author" : "Add Author"
                  }
                  variant={"contained"}
                  clickableSize={"large"}
                  onClick={
                    id !== undefined
                      ? onUpdateButtonClicked
                      : onAddButtonClicked
                  }
                  style={style.addButton}
                />
              </div>
              <div>
                <Clickable
                  ClickableText={"ADD NEW COOKBOOK"}
                  variant={"text"}
                  textColor={Color.lightTextSecondaryColor}
                  clickableSize={"large"}
                  onClick={onAddNewCookbookClicked}
                  style={style.cookbookButton}
                />
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const style = {
  mainContainer: {
    display: "flex",
    flex: 1,
    padding: "30px 20%",
    height: "100vh",
    justifyContent: "space-between",
  },
  headingContainer: {
    flex: 1,
  },
  subContainer: {
    display: "flex",
    flex: 7,
    justifyContent: "space-between",
  },
  bodyContainer: {
    flex: 2,
  },
  inputContainer: {
    border: "1px solid #6133BD",
    width: "100%",
    marginBottom: "30px",
    marginTop: "10px",
    paddingLeft: "10px",
    borderRadius: "10px",
  },
  buttonContainer: {
    flex: 4,
    marginBottom: "40px",
  },
  addButton: {
    width: "100%",
    marginBottom: "20px",
  },
  cookbookButton: {
    width: "100%",
    fontWeight: "400",
  },
};

export default CreateAuthorPage;

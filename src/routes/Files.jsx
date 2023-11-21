import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext
} from 'react-router-dom';
import styled, { css, useTheme } from 'styled-components';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  // ArrowLeftIcon,
  // ArrowRightIcon,
  FileIcon,
  FilledFolderIcon,
  PlusInCircleIcon,
  RenameIcon,
  TrashCanIcon
} from '../assets/24x-icons';
import { ArrowRightWithoutShaftIcon } from '../assets/16x-icons';
import Network from '../utils/net';
import { currentProfileState } from '../contexts/states';

const modal = withReactContent(Swal);

const FilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ControlNav = styled.div`
  display: flex;
  padding: 0px 18px;
  align-items: center;
  gap: 18px;
  align-self: stretch;
`;

const BreadCrumbs = styled.div`
  display: flex;
  padding: 4px;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.files.breadcrumbs.border};
  overflow-x: auto;
`;

const BreadCrumbBox = styled.div`
  display: flex;
  padding: 6px 12px;
  align-items: center;
  border-radius: 4px;
  transition: background-color 0.2s ease-in;
  cursor: pointer;
  font-weight: 400;
  line-height: 100%;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;

  ${({ $root }) =>
    $root &&
    css`
      opacity: 0.6;
    `}

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.files.breadcrumbs.item.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.files.breadcrumbs.item.active};
  }
`;

const BreadCrumb = ({ path, children, ...props }) => (
  <Link to={'/dashboard/files/' + path}>
    <BreadCrumbBox {...props}>{children}</BreadCrumbBox>
  </Link>
);

const BreadCrumbDivider = () => (
  <div style={{ position: 'relative', display: 'flex' }}>
    <span style={{ opacity: 0, position: 'absolute' }}>{'\\'}</span>
    <ArrowRightWithoutShaftIcon style={{ opacity: 0.4 }} />
  </div>
);

const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.divider.primary};
  border-radius: 1px;
`;

const NavIconButtonBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  border: none;
  position: relative;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    transition: background-color 0.2s ease-in;
  }

  :is(&:hover, &:focus-visible)::after {
    background-color: ${({ theme }) => theme.files.iconButton.hover};
  }

  &:active::after {
    background-color: ${({ theme }) => theme.files.iconButton.active};
  }
`;

const NavIconButton = ({ icon, ...props }) => (
  <NavIconButtonBox {...props}>{icon}</NavIconButtonBox>
);

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1 0 0;
  align-self: stretch;
`;

const FileListItemCommonStyle = css`
  border-radius: 8px;

  &:hover,
  &:focus {
    /* :focus-visible이 아닌 것은 의도입니다 */
    background-color: ${({ theme }) => theme.files.file.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.files.file.active};
  }
`;

const FileListItemBox = styled.div`
  display: flex;
  padding: 12px 18px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  color: ${({ theme }) => theme.text};
  user-select: none;
  // transition가 없는 것은 의도입니다 (0.1s라도 들어가면 배경 색이 바뀌는 데 시간이 걸려 인지에 영향을 끼침)

  ${FileListItemCommonStyle}

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: ${({ theme }) => theme.files.file.selected};

      &:hover,
      &:focus,
      &:active {
        /* :focus-visible이 아닌 것은 의도입니다 */
        background-color: ${({ theme }) => theme.files.file.selectedHover};
      }
    `}
`;

const FileListItemLink = styled(Link)`
  ${FileListItemCommonStyle}
`;

const FilesListItem = ({
  isDirectory = false,
  fileName,
  path,
  canDoubleClick = true,
  onSelectedChange,
  ...props
}) => {
  const theme = useTheme();
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const content = (
    <>
      {isDirectory ? (
        <FilledFolderIcon color={theme.files.file.folder} />
      ) : (
        <FileIcon />
      )}

      <span>{fileName}</span>
    </>
  );

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        canDoubleClick && navigate(path);
        break;

      case 'ArrowUp':
        e.preventDefault();
        ref.current?.previousSibling?.focus();
        break;

      case 'ArrowDown':
        e.preventDefault();
        ref.current?.nextSibling?.focus();
        break;

      default:
        break;
    }
  };

  if (!canDoubleClick)
    return (
      <FileListItemLink to={path} onKeyDown={handleKeyDown} ref={ref}>
        <FileListItemBox onKeyDown={handleKeyDown} {...props}>
          {content}
        </FileListItemBox>
      </FileListItemLink>
    );

  const handleSelectedChange = (state) => {
    setIsSelected(state);
    onSelectedChange({
      fileName,
      path,
      isDirectory,
      isSelected: state
    });
  };

  return (
    <FileListItemBox
      $isSelected={isSelected}
      onDoubleClick={() => navigate(path)}
      onFocus={() => handleSelectedChange(true)}
      // onBlur={() => handleSelectedChange(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={ref}
      {...props}
    >
      {content}
    </FileListItemBox>
  );
};

const Files = () => {
  /* eslint-disable no-unused-vars */
  const [refreshFn, setRefreshFn] = useOutletContext();
  const [profile, setProfile] = useRecoilState(currentProfileState);
  /* eslint-enable no-unused-vars */

  const fileListRef = useRef(null);
  const [files, setFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState([]);
  const [locationPath, setLocationPath] = useState([]);
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    setLocationPath(
      location.pathname
        .split('/dashboard/files')[1]
        ?.split('/')
        .filter((path) => path !== '')
        .map((item) => decodeURIComponent(item))
    );
  }, [location.pathname]);

  const getPathOfFile = useCallback(
    (fileName) => {
      const path = locationPath
        .map((path) => encodeURIComponent(path))
        .join('/');

      return `/dashboard/files/${path}/${encodeURIComponent(fileName)}`;
    },
    [locationPath]
  );

  const fetchFiles = useCallback(async () => {
    setFiles({});

    const { data } = await Network.get(
      profile.address,
      profile.port,
      profile.key,
      profile.isSecureConnection,
      `files/${locationPath.join('/')}`
      // 런처 문제로 엔드포인트가 files이 아닌 files/로 설정되었습니다
    );

    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });

    if (!data) {
      return;
    }

    if (!data.content) {
      data.content = [];
    }

    const onlyFolders = data.content?.filter((item) => item.IsDirectory);
    onlyFolders.sort((a, b) => collator.compare(a.FileName, b.FileName));

    const onlyFiles = data.content?.filter((item) => !item.IsDirectory);
    onlyFiles.sort((a, b) => collator.compare(a.FileName, b.FileName));

    setFiles({
      ...data,
      content: [...onlyFolders, ...onlyFiles]
    });
  }, [profile, locationPath]);

  useEffect(() => {
    // '지금 새로 고침하기' 버튼을 누를 때
    setRefreshFn(() => fetchFiles);
  }, [setRefreshFn, fetchFiles]);

  useEffect(() => {
    // profile, locationPath가 바뀔 때
    fetchFiles();
  }, [fetchFiles]);

  useEffect(() => {
    // 파일 목록이 바뀌면 맨 첫 번째 파일에 포커스
    fileListRef.current?.children[0]?.focus();
  }, [files]);

  const handleSelectedChange = (data) => {
    const { fileName, path, isDirectory, isSelected } = data;

    if (isSelected) {
      setSelectedFile({ fileName, path, isDirectory });
    }

    if (!isSelected) {
      setSelectedFile(null);
    }
  };

  const handleDelete = async () => {
    modal.fire({
      icon: 'warning',
      html: (
        <>
          <h3>
            <span style={{ color: theme.files.delete.accent }}>
              ‘{selectedFile.fileName}’
            </span>{' '}
            폴더를 정말 삭제하시겠습니까?
          </h3>
          <p>
            한번 삭제하면 복구할 수 없습니다.
            <br />이 파일을 삭제하려는 게 맞는지 꼼꼼히 확인해 주세요.
          </p>
        </>
      ),
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const { data } = await Network.delete(
          profile.address,
          profile.port,
          profile.key,
          profile.isSecureConnection,
          `files/${locationPath.join('/')}/${selectedFile.fileName}`
        );

        if (!data) {
          throw new Error('Failed to delete file');
        }

        return data;
      }
    });
  };

  return (
    <FilesContainer>
      <ControlNav>
        {/* TODO 앞/뒤로 이동. 기술적으로 어려움을 겪고 있어서 잠시 보류합니다
          <NavIconButton
            icon={<ArrowLeftIcon />}
          />
          <NavIconButton
            icon={<ArrowRightIcon />}
          />

          <Divider />
        */}

        <BreadCrumbs>
          <BreadCrumb $root path=''>
            (Launcher Root)
          </BreadCrumb>

          {locationPath.map((path, index) => (
            <React.Fragment key={index + path}>
              <BreadCrumbDivider />

              <BreadCrumb
                path={locationPath
                  .slice(0, index + 1)
                  .map((path) => encodeURIComponent(path))
                  .join('/')}
              >
                {path}
              </BreadCrumb>
            </React.Fragment>
          ))}
        </BreadCrumbs>

        <Divider />

        <NavIconButton icon={<PlusInCircleIcon />} />
        <NavIconButton icon={<RenameIcon />} $disabled={!selectedFile} />
        <NavIconButton
          icon={<TrashCanIcon />}
          onClick={handleDelete}
          $disabled={!selectedFile}
        />
      </ControlNav>

      <FileList ref={fileListRef}>
        {files.content && locationPath.length > 0 && (
          <FilesListItem
            isDirectory={true}
            fileName='..'
            canDoubleClick={false}
            path={getPathOfFile('..')}
          />
        )}

        {files.content?.map(
          ({ FileName: fileName, IsDirectory: isDirectory }) => (
            <FilesListItem
              key={fileName}
              isDirectory={isDirectory}
              fileName={fileName}
              onSelectedChange={handleSelectedChange}
              path={getPathOfFile(fileName)}
            />
          )
        )}
      </FileList>
    </FilesContainer>
  );
};

export default Files;

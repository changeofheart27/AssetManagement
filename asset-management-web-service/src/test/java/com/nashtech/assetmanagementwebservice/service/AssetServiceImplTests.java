package com.nashtech.assetmanagementwebservice.service;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.nashtech.assetmanagementwebservice.entity.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.nashtech.assetmanagementwebservice.model.dto.AssetDTO;
import com.nashtech.assetmanagementwebservice.entity.Asset;
import com.nashtech.assetmanagementwebservice.exception.NotFoundException;
import com.nashtech.assetmanagementwebservice.model.mapper.AssetMapper;
import com.nashtech.assetmanagementwebservice.repository.AssetRepository;
import com.nashtech.assetmanagementwebservice.service.impl.AssetServiceImpl;

@ExtendWith(SpringExtension.class)
public class AssetServiceImplTests {
    @Mock
    private AssetRepository assetRepository;

    @Mock
    private AssetMapper assetMapper;

    @Captor
    private ArgumentCaptor<Asset> captor;

    @InjectMocks
    private AssetServiceImpl underTest;

    private static List<Asset> testList;

    @BeforeAll
    public static void init() {
        Asset first = new Asset(1, "Asset 1");
        Asset second = new Asset(2, "Asset 2");
        testList = new ArrayList<Asset>();
        testList.add(first);
        testList.add(second);
    }


    @DisplayName("Test findAssetById() Method")
    @Nested
    public class testFindAssetById {
        @Test
        public void testFindAssetByIdGivenIdNotExistInDatabaseShouldThrowNotFoundException() {
            NotFoundException exception = assertThrows(NotFoundException.class, () -> underTest.findAssetById(1));
            assertEquals("No record found with id 1", exception.getMessage());
        }

        @Test
        public void testFindAssetByIdGivenIdExistInDatabaseShouldReturnDataSuccessfully() {
            when(assetRepository.getById(2)).thenReturn(testList.get(1));
            
            AssetDTO mockPayload = mock(AssetDTO.class);
            when(mockPayload.getId()).thenReturn(2);
            when(mockPayload.getAssetName()).thenReturn(testList.get(1).getAssetName());
            
            AssetDTO asset = underTest.findAssetById(2);
            assertEquals(mockPayload.getId(), asset.getId());
            assertEquals(mockPayload.getAssetName(), "Asset 2");
        }
    }


    @DisplayName("Test getAssetList() Method")
    @Nested
    public class testGetAssetList {
        @Test
        public void testGetAssetListGivenAssetExistShouldReturnDataSuccessfully() {
            when(assetRepository.findAll()).thenReturn(testList);
            List<AssetDTO> assets = underTest.getAssetList();
            assertEquals(testList.size(), assets.size());
            assertEquals(testList.get(1).getId(), assets.get(1).getId());
            assertEquals(testList.get(1).getAssetName(), assets.get(1).getAssetName());
            verify(assetRepository).findAll();
        }

        @Test
        public void testGetAssetListGivenNoAssetShouldReturnNoData() {
            when(assetRepository.findAll()).thenReturn(new ArrayList<Asset>());
            List<AssetDTO> noAssets = underTest.getAssetList();
            assertEquals(noAssets.size(), 0);
            verify(assetRepository).findAll();
        }

    }


    //TODO: create test case for createAsset()


    //TODO: Test case for editAsset()
    @DisplayName("Test editAsset() method")
    @Nested
    public class testEditAsset {
        @Test
        public void testEditAssetGivenAssetIdIsNullShouldThrowException(){
            AssetDTO assetDTO = mock(AssetDTO.class);
            IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> underTest.editAsset(assetDTO, null));
            assertEquals("asset id can not be null", exception.getMessage());
        }
        @Test
        public void testEditAssetGivenAssetPayLoadIsNullShouldBeThrowException(){
            IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> underTest.editAsset(null, 1));
            assertEquals("request asset can not be null", exception.getMessage());
        }

        @Test void testEditAssetGivenValidAsset(){
            AssetDTO assetDTO = mock(AssetDTO.class);
            when(assetDTO.getId()).thenReturn(1);

        }
    }
}

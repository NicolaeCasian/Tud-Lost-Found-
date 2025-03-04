import React, {useEffect, useState, useRef} from 'react';
import {
    IonAccordion,
    IonAccordionGroup,
    IonButton,
    IonCheckbox,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonPage,
    IonRow,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonSearchbar,
    IonIcon
} from '@ionic/react';
import {useMsal} from '@azure/msal-react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {chevronBackOutline, chevronForwardOutline} from 'ionicons/icons';
import './Tab1.css';
import Header from '../components/Header';

const Tab1: React.FC = () => {
    const {instance} = useMsal();
    const history = useHistory();

    // Separate state variables for lost and found items
    const [lostItems, setLostItems] = useState<any[]>([]);
    const [foundItems, setFoundItems] = useState<any[]>([]);
    const [showSearch, setShowSearch] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [searchQuery, setSearchQuery] = useState("");
    const API_URL = import.meta.env.VITE_API_URL || "https://tudlnf-serverv2-90ee51882713.herokuapp.com";


    // Use a ref to persist the last scroll position between renders
    const lastScrollY = useRef(0);

    // Filters state using Set() for efficient lookups
    const [filters, setFilters] = useState({
        type: new Set<string>(),
        category: new Set<string>(),
        location: new Set<string>()
    });

    // Handle checkbox filter changes
    const handleFilterChange = (
        event: CustomEvent,
        filterType: keyof typeof filters,
        value: string
    ) => {
        setFilters((prevFilters) => {
            const updatedFilter = new Set(prevFilters[filterType]);
            event.detail.checked ? updatedFilter.add(value) : updatedFilter.delete(value);
            return {...prevFilters, [filterType]: updatedFilter};
        });
    };

    // Fetch lost items from API
    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/lost_items`);
                if (response.data.success) {
                    setLostItems(response.data.items);
                }
            } catch (error) {
                console.error('Error fetching lost items:', error);
            }
        };
        fetchLostItems();
    }, []);

    // Fetch found items from API
    useEffect(() => {
        const fetchFoundItems = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/found_items`);
                if (response.data.success) {
                    setFoundItems(response.data.items);
                }
            } catch (error) {
                console.error('Error fetching found items:', error);
            }
        };
        fetchFoundItems();
    }, []);

    const handleItemClick = (id: string) => {
        history.push(`/item/${id}`);
    };

    // Combine lost and found items into one array
    const allItems = [...lostItems, ...foundItems];

    // Filter items by selected filters and search query
    const filteredItems = allItems.filter((item) => {
        const typeMatch = filters.type.size === 0 || filters.type.has(item.type);
        const categoryMatch = filters.category.size === 0 || filters.category.has(item.category);
        const locationMatch = filters.location.size === 0 || filters.location.has(item.location);
        const searchMatch =
            searchQuery === "" ||
            (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return typeMatch && categoryMatch && locationMatch && searchMatch;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    // Show/hide searchbar when scrolling
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowSearch(currentScrollY < lastScrollY.current);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = async () => {
        try {
            await instance.logoutPopup();
            history.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Apply filters and reset to first page
    const applyFilters = () => {
        setCurrentPage(1);
    };

    return (
        <IonPage className="tab1">
            <IonSplitPane contentId="main-content">
                {/* Side Navigation (Filters) */}
                <IonMenu contentId="main-content" type="overlay">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Filters</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            <IonAccordionGroup>
                                {/* Type Filter */}
                                <IonAccordion value="type">
                                    <IonItem slot="header">
                                        <IonTitle>Type</IonTitle>
                                    </IonItem>
                                    <div slot="content">
                                        <IonItem lines="none">
                                            <IonLabel>Lost</IonLabel>
                                            <IonCheckbox
                                                slot="end"
                                                onIonChange={(e) => handleFilterChange(e, "type", "Lost")}
                                            />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Found</IonLabel>
                                            <IonCheckbox
                                                slot="end"
                                                onIonChange={(e) => handleFilterChange(e, "type", "Found")}
                                            />
                                        </IonItem>
                                    </div>
                                </IonAccordion>
                                {/* Category Filter */}
                                <IonAccordion value="category">
                                    <IonItem slot="header">
                                        <IonTitle>Category</IonTitle>
                                    </IonItem>
                                    <div slot="content">
                                        {["Electronics", "Clothes", "Backpacks", "Keys", "Wallets", "Student ID", "Other"].map(category => (
                                            <IonItem key={category} lines="none">
                                                <IonLabel>{category}</IonLabel>
                                                <IonCheckbox
                                                    slot="end"
                                                    onIonChange={(e) => handleFilterChange(e, "category", category)}
                                                />
                                            </IonItem>
                                        ))}
                                    </div>
                                </IonAccordion>
                                {/* Location Filter */}
                                <IonAccordion value="location">
                                    <IonItem slot="header">
                                        <IonTitle>Location</IonTitle>
                                    </IonItem>
                                    <div slot="content">
                                        {["A Block", "B Block", "C Block", "D Block", "E Block", "F Block", "Sports Block", "Other"].map(location => (
                                            <IonItem key={location} lines="none">
                                                <IonLabel>{location}</IonLabel>
                                                <IonCheckbox
                                                    slot="end"
                                                    onIonChange={(e) => handleFilterChange(e, "location", location)}
                                                />
                                            </IonItem>
                                        ))}
                                    </div>
                                </IonAccordion>
                            </IonAccordionGroup>
                            <IonButton expand="full" onClick={applyFilters}>Apply Filters</IonButton>
                        </IonList>
                    </IonContent>
                </IonMenu>

                {/* Main Content */}
                <IonPage id="main-content">
                    <IonHeader>
                        <Header/>
                        {showSearch && (
                            <IonToolbar>
                                <IonSearchbar
                                    placeholder="Search for items..."
                                    value={searchQuery}
                                    onIonInput={(e) => setSearchQuery(e.detail.value!)}
                                    show-clear-button="focus"
                                />
                            </IonToolbar>
                        )}
                    </IonHeader>
                    <IonContent fullscreen>
                        <IonGrid>
                            <IonRow>
                                {displayedItems.length > 0 ? (
                                    displayedItems.map((item, index) => (
                                        <IonCol size="12" sizeLg="6" sizeMd="6" sizeXl="4" key={index}>
                                            <IonCard>
                                                <img alt={item.name} src={item.image}/>
                                                <IonCardHeader
                                                    style={{borderBottom: '1px solid #ddd', marginBottom: '10px'}}>
                                                    <IonCardTitle>{item.name}</IonCardTitle>
                                                    <IonCardSubtitle>{item.category}</IonCardSubtitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <p style={{marginBottom: '8px'}}>{item.description}</p>
                                                    <p style={{
                                                        fontWeight: 'bold',
                                                        fontSize: '1.1rem'
                                                    }}>Location: {item.location}</p>
                                                </IonCardContent>
                                                <IonButton onClick={() => handleItemClick(item._id)}>View Item</IonButton>
                                            </IonCard>
                                        </IonCol>
                                    ))
                                ) : (
                                    <IonCol size="12">
                                        <p>No items found.</p>
                                    </IonCol>
                                )}
                            </IonRow>
                        </IonGrid>

                        {/* Pagination Controls */}
                        <IonGrid>
                            <IonRow className="ion-align-items-center ion-justify-content-center">
                                <IonCol size="auto">
                                    <IonButton disabled={currentPage === 1}
                                               onClick={() => setCurrentPage(currentPage - 1)}>
                                        <IonIcon icon={chevronBackOutline}/>
                                    </IonButton>
                                </IonCol>
                                <IonCol size="auto">
                                    <span>Page {currentPage} of {totalPages}</span>
                                </IonCol>
                                <IonCol size="auto">
                                    <IonButton disabled={currentPage >= totalPages}
                                               onClick={() => setCurrentPage(currentPage + 1)}>
                                        <IonIcon icon={chevronForwardOutline}/>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            </IonSplitPane>
        </IonPage>
    );
};

export default Tab1;

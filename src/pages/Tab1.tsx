import React, { useEffect, useState } from 'react';
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
    IonMenuButton,
    IonPage,
    IonRow,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonSearchbar,
    IonIcon
} from '@ionic/react';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import './Tab1.css';

const Tab1: React.FC = () => {
    const { instance } = useMsal();
    const history = useHistory();
    const [lostItems, setLostItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [showSearch, setShowSearch] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // 🔥 Search state
    let lastScrollY = 0;

    // Filters state using Set() for efficient lookups
    const [filters, setFilters] = useState({
        type: new Set<string>(),  
        category: new Set<string>(), 
        location: new Set<string>() // 🔥 Added location filter back
    });

    // Handles checkbox filter changes
    const handleFilterChange = (event: CustomEvent, filterType: keyof typeof filters, value: string) => {
        setFilters((prevFilters) => {
            const updatedFilter = new Set(prevFilters[filterType]);
            event.detail.checked ? updatedFilter.add(value) : updatedFilter.delete(value);
            return { ...prevFilters, [filterType]: updatedFilter };
        });
    };

    // Fetch lost items from API
    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const response = await axios.get('https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/lost_items');
                if (response.data.success) {
                    setLostItems(response.data.items);
                }
            } catch (error) {
                console.error('Error fetching lost items:', error);
            }
        };
        fetchLostItems();
    }, []);

    // Hide search bar when scrolling down
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowSearch(currentScrollY < lastScrollY);
            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Apply filters and reset pagination to page 1
    const applyFilters = () => {
        setCurrentPage(1);
    };

    // 🔥 FILTER ITEMS FIRST 🔥
    const filteredItems = lostItems.filter((item) => {
        const typeMatch = filters.type.size === 0 || filters.type.has(item.type);
        const categoryMatch = filters.category.size === 0 || filters.category.has(item.category);
        const locationMatch = filters.location.size === 0 || filters.location.has(item.location); // 🔥 Added location filtering back
        const searchMatch = searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return typeMatch && categoryMatch && locationMatch && searchMatch;
    });

    // 🔥 PAGINATE AFTER FILTERING 🔥
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    return (
        <IonPage className={"tab1"}>
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
                                        {["Lost", "Found"].map(type => (
                                            <IonItem key={type} lines="none">
                                                <IonLabel>{type}</IonLabel>
                                                <IonCheckbox
                                                    slot="end"
                                                    checked={filters.type.has(type)}
                                                    onIonChange={(e) => handleFilterChange(e, "type", type)}
                                                />
                                            </IonItem>
                                        ))}
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
                                                    checked={filters.category.has(category)}
                                                    onIonChange={(e) => handleFilterChange(e, "category", category)}
                                                />
                                            </IonItem>
                                        ))}
                                    </div>
                                </IonAccordion>

                                {/* 🔥 Location Filter (Added Back) 🔥 */}
                                <IonAccordion value="location">
                                    <IonItem slot="header">
                                        <IonTitle>Location</IonTitle>
                                    </IonItem>
                                    <div slot="content">
                                        {["Block A", "Block B", "Block C", "Block D", "Block E", "Block F", "Sports Block", "Other"].map(location => (
                                            <IonItem key={location} lines="none">
                                                <IonLabel>{location}</IonLabel>
                                                <IonCheckbox
                                                    slot="end"
                                                    checked={filters.location.has(location)}
                                                    onIonChange={(e) => handleFilterChange(e, "location", location)}
                                                />
                                            </IonItem>
                                        ))}
                                    </div>
                                </IonAccordion>
                            </IonAccordionGroup>
                        </IonList>
                    </IonContent>
                </IonMenu>

                {/* Main Content */}
                <IonPage id="main-content">
                    <IonContent fullscreen>
                        <Header />

                        {/* 🔥 Search Bar 🔥 */}
                        <IonToolbar>
                            <IonSearchbar
                                placeholder="Search for items..."
                                value={searchQuery}
                                onIonInput={(e) => setSearchQuery(e.detail.value!)}
                            />
                        </IonToolbar>

                        <IonGrid>
                            <IonRow>
                                {displayedItems.map((item, index) => (
                                    <IonCol size="12" sizeLg="6" sizeMd="6" sizeXl="4" key={index}>
                                        <IonCard>
                                            <img alt={item.name} src={item.image} />
                                            <IonCardHeader>
                                                <IonCardTitle>{item.name}</IonCardTitle>
                                                <IonCardSubtitle>{item.category}</IonCardSubtitle>
                                            </IonCardHeader>
                                        </IonCard>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonGrid>

                        {/* Pagination Controls */}
                        <IonGrid>
                            <IonRow className="ion-align-items-center ion-justify-content-center">
                                <IonCol size="auto">
                                    <IonButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                        <IonIcon icon={chevronBackOutline} />
                                    </IonButton>
                                </IonCol>

                                <IonCol size="auto">
                                    <span>Page {currentPage} of {totalPages}</span>
                                </IonCol>

                                <IonCol size="auto">
                                    <IonButton disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                        <IonIcon icon={chevronForwardOutline} />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                        <Footer />
                    </IonContent>
                </IonPage>
            </IonSplitPane>
        </IonPage>
    );
};

export default Tab1;

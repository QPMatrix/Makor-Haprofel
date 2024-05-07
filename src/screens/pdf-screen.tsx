import React, {useEffect, useState} from 'react';
import {Alert, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Loader from '../components/loader';
import {getCart} from '../services/cart';
import {useNavigation} from '@react-navigation/native';

const PdfScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getCart();
        if (res) {
          setData(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const generatePDF = async () => {
      setIsLoading(true);
      try {
        const html = `
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            img {
              display: block;
              width: 100%;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th,
            td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <div>
            <img src="https://yuvmnlhnfxvxifsdyins.supabase.co/storage/v1/object/public/aluminum/pdf-header.png" alt="Logo" />
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Kg/6m</th>
                  <th>Kg/m</th>
                  <th>מספר מקור הפרופיל</th>
                  <th>תמונה הפרופיל</th>
                  <th>מספר קליל</th>
                  <th>שם פרופילם בעברית</th>
                  <th>כמות</th>
                  <th>מספר</th>
                </tr>
              </thead>
              <tbody>
              ${data
                .map(
                  (item: any) =>
                    `<tr>
                    <td>${item.kg6m}</td>
                    <td>${item.kgm}</td>
                    <td>${item.mkbr}</td>
                    <td><img src="${item.image_url}" alt="profile" style="width:50px; height:50px;" /></td>
                    <td>${item.kbr}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${count}</td>
                  </tr>`,
                )
                .join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
      `;
        const options = {
          html,
          fileName: `${count}: מקור_הפרופיל_הזמנה_מספר`,
          directory: 'מקור הפרופיל',
        };
        const file = await RNHTMLtoPDF.convert(options);
        const shareOptions = {
          title: 'Share file',
          failOnCancel: false,
          url: file.filePath!,
        };
        const res = await Share.share(shareOptions);
        if (res.action === Share.sharedAction) {
          if (res.activityType) {
            console.log('shared with activity type of', res.activityType);
            setCount(count + 1);
            setIsLoading(false);
            //@ts-ignore
            navigate.navigate('Main');
          } else {
            console.log('shared');
          }
        } else if (res.action === Share.dismissedAction) {
          console.log('dismissed');
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    generatePDF();
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }
};

export default PdfScreen;

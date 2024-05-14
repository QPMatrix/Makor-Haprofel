import React, {useEffect, useState} from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Loader from '../components/loader';
import {getCart} from '../services/cart';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Share} from 'react-native';

const PdfScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [user, setUser] = useState<any>();
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
    const getUser = async () => {
      const res = await AsyncStorage.getItem('user');
      if (res) {
        setUser(JSON.parse(res));
      }
      console.log(res);
    };
    getUser();
  }, []);

  useEffect(() => {
    const generatePDF = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const html = `
        <html lang="he">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
              direction: rtl; /* Right-to-left direction for Hebrew */
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
              word-wrap: break-word;
            }
            th {
              background-color: #f2f2f2;
            }
            footer {
              text-align: center;
              margin-top: 20px;
              font-size: 0.8em;
              color: #888;
            }
            @media screen and (max-width: 600px) {
              table, th, td {
                font-size: 0.8em;
              }
            }
          </style>
        </head>
        <body>
          <div>
            <img src="https://yuvmnlhnfxvxifsdyins.supabase.co/storage/v1/object/public/aluminum/pdf-header.png" alt="Logo" />
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px;">
          <p style="margin: 0;">מספר הזמנה: ${count}</p>
          <p style="margin: 0;">שם הלקוח: ${user.name}</p>
          <p style="margin: 0;">טלפון: ${user.phone_number}</p>
          <p style="margin: 0;">תאריך: ${new Date().toLocaleDateString()}</p>
        </div>
          <div>
          <table>
          <thead>
            <tr>
            <th>מספר</th>
            <th>כמות</th>
            <th>שם פרופילם בעברית</th>
            <th>מספר קליל</th>
            <th>תמונה הפרופיל</th>
            <th>מספר מקור הפרופיל</th>
            <th>צבע</th>
            <th>Kg/m</th>
            <th>Kg/6m</th>
            <th>ס"ך משקל Kg/6m</th>
            <th>ס"ך משקל Kg/m</th>
            </tr>
          </thead>
          <tbody>
          ${data
            .map(
              (item: any, index: number) =>
                `<tr>
              <td>${index + 1}</td>
              <td>${item.quantity}</td>
              <td>${item.name}</td>
              <td>${item.kbr}</td>
              <td><img src="${
                item.image_url
              }" alt="profile" style="width:50px; height:50px;" /></td>
              <td>${item.mkbr}</td>
              <td>${item.color}</td>
              <td>${item.kgm.toFixed(2)}</td>
              <td>${item.kg6m.toFixed(2)}</td>
              <td>${(item.kg6m * item.quantity).toFixed(2)}</td>
              <td>${(item.kgm * item.quantity).toFixed(2)}</td>
              </tr>`,
            )
            .join('')}
            <tr>
              <td colspan="10">סה"כ</td>
              <td>${data
                .reduce((total, item) => total + item.kgm * item.quantity, 0)
                .toFixed(2)}</td>
              <td>${data
                .reduce((total, item) => total + item.kg6m * item.quantity, 0)
                .toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
          </div>
          <footer>
            <p>מופעל על ידי <a href="http://www.qpmatrix.tech" target="_blank">QPMATRIX</a></p>
          </footer>
        </body>
        </html>
        `;
        const options = {
          html,
          fileName: ` מקור_הפרופיל_הזמנה_${user.name}`,
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
            AsyncStorage.removeItem('cart');
          } else {
            console.log('shared');
          }
        } else if (res.action === Share.dismissedAction) {
          console.log('dismissed');
        }
      } catch (error: any) {
        setIsLoading(false);
        Alert.alert('Error', error.message);
        //@ts-ignore
        navigate.navigate('Cart');
        console.log();
      }
    };
    generatePDF();
  }, [data, user]);

  if (isLoading) {
    return <Loader />;
  }
};

export default PdfScreen;
